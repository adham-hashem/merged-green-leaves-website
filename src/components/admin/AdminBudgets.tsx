import { useEffect, useState } from 'react';
import { api, BudgetOption } from '../../lib/api';
import { Plus, Trash2, Edit2, Save, X, Settings, Check } from 'lucide-react';

export default function AdminBudgets() {
  const [budgets, setBudgets] = useState<BudgetOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    value: '',
    display_order: 1,
    is_active: true,
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const { data, error } = await api.budgets.getAll();
      if (error) throw error;
      setBudgets(data || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      value: '',
      display_order: budgets.length + 1,
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.value.trim()) {
      alert('Please enter a budget option value.');
      return;
    }

    try {
      if (editingId) {
        const { error } = await api.budgets.update(editingId, {
          value: formData.value.trim(),
          display_order: Number(formData.display_order),
          is_active: formData.is_active,
        });
        if (error) throw error;
      } else {
        const { error } = await api.budgets.create({
          value: formData.value.trim(),
          display_order: Number(formData.display_order),
          is_active: formData.is_active,
        });
        if (error) throw error;
      }

      resetForm();
      fetchBudgets();
    } catch (error) {
      console.error('Error saving budget option:', error);
      alert('Failed to save budget option. It might be a duplicate value.');
    }
  };

  const handleEdit = (budget: BudgetOption) => {
    setFormData({
      value: budget.value,
      display_order: budget.display_order,
      is_active: budget.is_active,
    });
    setEditingId(budget.id);
    setShowForm(true);

    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this budget option? Customers who selected this range will still display it, but it cannot be selected for new bookings.')) return;

    try {
      const { error } = await api.budgets.delete(id);
      if (error) throw error;
      fetchBudgets();
    } catch (error) {
      console.error('Error deleting budget option:', error);
      alert('Failed to delete budget option.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading budget options...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Budget Options Management</h1>
          <p className="text-gray-600">Determine the budget ranges that appear on customer booking forms</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Add Budget Option
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Budget Option' : 'Add New Budget Option'}
            </h2>
            <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Value Range</label>
                <input
                  type="text"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-900"
                  placeholder="e.g., £500 - £1,000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-900"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-600"
                />
                <span className="font-semibold text-gray-700">Available to customers (Active)</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {editingId ? 'Update Option' : 'Add Option'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {budgets.length === 0 ? (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin duration-[10s]" />
            <p className="text-gray-600 font-medium">No budget options configured yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Configure First Option
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 font-semibold text-gray-700 w-16">Order</th>
                  <th className="py-4 px-6 font-semibold text-gray-700">Budget Range Value</th>
                  <th className="py-4 px-6 font-semibold text-gray-700 w-32">Status</th>
                  <th className="py-4 px-6 font-semibold text-gray-700 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => (
                  <tr
                    key={budget.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !budget.is_active ? 'opacity-60 bg-gray-50/50' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-gray-800">{budget.display_order}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900 text-lg">{budget.value}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          budget.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {budget.is_active ? (
                          <>
                            <Check size={12} />
                            Active
                          </>
                        ) : (
                          'Inactive'
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(budget)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="Edit Option"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(budget.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Delete Option"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
