import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, getMediaUrl, Service } from '../lib/api';
import * as LucideIcons from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IMAGE_MAPPING: Record<string, string> = {
  'landscaping': '/reducedSizeImages/landscaping.webp',
  'fencing': '/reducedSizeImages/Fencing.webp',
  'turfing': '/reducedSizeImages/Turfing.webp',
  'patios': '/reducedSizeImages/Patios.webp',
  'tree surgery': '/reducedSizeImages/Tree Surgery.webp',
  'hedges & shrubs': '/reducedSizeImages/Hedges & Shrubs.webp',
  'grass cutting': '/reducedSizeImages/Grass Cutting.webp',
  'garden clearance': '/reducedSizeImages/Garden Clearance.webp',
  'commercial sites': '/reducedSizeImages/Commercial Sites .webp'
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchServiceDetail(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const fetchServiceDetail = async (serviceId: string) => {
    setLoading(true);
    setError('');
    try {
      const { data, error: apiError } = await api.services.getById(serviceId);
      if (apiError) throw apiError;
      if (data) {
        setService(data);
        
        // Update browser page title dynamically for SEO
        document.title = `${data.title} Services in Cambridge | Cambridge Green Leaves`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content', 
            data.description || `Professional ${data.title} services in Cambridge and surrounding areas by Cambridge Green Leaves.`
          );
        }
      } else {
        setError('Service not found');
      }
    } catch (err) {
      console.error('Error fetching service details:', err);
      setError('Failed to load service details. It may not exist.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header activeSection="services" />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header activeSection="services" />
        <div className="flex-1 max-w-xl mx-auto px-4 py-24 text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 shadow-md">
            <LucideIcons.AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'We couldn\'t find the service details you were looking for.'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
            >
              <LucideIcons.ArrowLeft size={20} />
              Return Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const titleLower = service.title.toLowerCase().trim();
  const bannerImage = service.image_url ? getMediaUrl(service.image_url) : (IMAGE_MAPPING[titleLower] || '/background_home.jpg');
  const IconComponent = (LucideIcons as any)[service.icon_name || 'Leaf'] || LucideIcons.Leaf;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeSection="services" />
      
      <main className="flex-1">
        {/* Banner Hero Section */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-black text-white">
          <img
            src={bannerImage}
            alt={`${service.title} Banner`}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-600/90 backdrop-blur p-3 rounded-2xl text-white shadow-lg flex-shrink-0">
                  <IconComponent size={32} />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight drop-shadow-md">
                    {service.title}
                  </h1>
                  <p className="text-green-200 text-sm sm:text-lg mt-1 font-medium max-w-2xl">
                    {service.description || 'Professional gardening and maintenance services in Cambridge.'}
                  </p>
                </div>
              </div>
              
              <Link
                to={`/?service=${encodeURIComponent(service.title)}#booking`}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-lg text-center whitespace-nowrap self-start sm:self-center"
              >
                Request Booking
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gradient-to-b from-white to-green-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Detailed Content Left Column */}
              <div className="lg:col-span-2 space-y-8 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 border-b pb-6">
                  <LucideIcons.Leaf className="text-green-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800">Service Overview & Details</h2>
                </div>

                <div className="prose prose-green max-w-none text-gray-600 leading-relaxed space-y-6">
                  {service.content ? (
                    service.content.split('\n').map((paragraph, index) => {
                      const trimmed = paragraph.trim();
                      if (!trimmed) return null;
                      
                      // Check for bullet lists (starting with - or *)
                      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                        return (
                          <div key={index} className="flex items-start gap-2.5 my-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></span>
                            <span>{trimmed.substring(1).trim()}</span>
                          </div>
                        );
                      }
                      
                      return (
                        <p key={index} className="text-lg">
                          {trimmed}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-lg">
                      {service.description || 'No detailed content has been provided for this service yet. Please contact us to find out more details about how we can help you with your project.'}
                    </p>
                  )}
                </div>

                {/* Back to list */}
                <div className="pt-6 border-t flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <Link
                    to="/"
                    className="text-green-600 hover:text-green-700 font-bold flex items-center gap-2 transition-colors"
                  >
                    <LucideIcons.ChevronLeft size={18} />
                    Back to All Services
                  </Link>
                  
                  <span className="text-xs text-gray-400">
                    Cambridge Green Leaves • Available in Cambridge and surroundings
                  </span>
                </div>
              </div>

              {/* Call To Action Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent"></div>
                  
                  <h3 className="text-xl font-bold mb-4 relative z-10">Need a Professional Quote?</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10">
                    We offer free consultations and transparent pricing for all our {service.title.toLowerCase()} services in Cambridge.
                  </p>

                  <div className="space-y-4 relative z-10 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2.5 rounded-xl text-green-400">
                        <LucideIcons.Phone size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Call Us Directly</p>
                        <a href="tel:07961228431" className="text-lg font-bold hover:text-green-400 transition-colors">07961228431</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2.5 rounded-xl text-yellow-400">
                        <LucideIcons.Mail size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Send an Email</p>
                        <a href="mailto:greenleaves132@hotmail.co.uk" className="text-sm font-semibold hover:text-yellow-400 transition-colors">greenleaves132@hotmail.co.uk</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2.5 rounded-xl text-green-400">
                        <LucideIcons.MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Service Coverage</p>
                        <p className="text-sm font-semibold">Cambridge & Surrounding Areas</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/?service=${encodeURIComponent(service.title)}#booking`}
                    className="block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-center font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-green-500/20 relative z-10"
                  >
                    Book {service.title} Now
                  </Link>
                </div>

                {/* Assurance Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <LucideIcons.ShieldCheck className="text-green-600" size={20} />
                    Our Service Guarantee
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>100% Customer Satisfaction Guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Experienced and Qualified Specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>High-Quality Materials & Equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Fully Insured & Local Family Business</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
