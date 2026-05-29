import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import * as LucideIcons from 'lucide-react';

interface ServiceItem {
  id?: string;
  title: string;
  description?: string;
  icon_name?: string;
  image?: string;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  { title: 'Landscaping', image: '/reducedSizeImages/landscaping.webp' },
  { title: 'Fencing', image: '/reducedSizeImages/Fencing.webp' },
  { title: 'Turfing', image: '/reducedSizeImages/Turfing.webp' },
  { title: 'Patios', image: '/reducedSizeImages/Patios.webp' },
  { title: 'Tree Surgery', image: '/reducedSizeImages/Tree Surgery.webp' },
  { title: 'Hedges & Shrubs', image: '/reducedSizeImages/Hedges & Shrubs.webp' },
  { title: 'Grass Cutting', image: '/reducedSizeImages/Grass Cutting.webp' },
  { title: 'Garden Clearance', image: '/reducedSizeImages/Garden Clearance.webp' },
  { title: 'Commercial Sites', image: '/reducedSizeImages/Commercial Sites .webp' },
];

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

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await api.services.getAll(true);
      if (error) throw error;
      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices(FALLBACK_SERVICES);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setServices(FALLBACK_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Professional gardening solutions tailored to your needs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const titleLower = service.title.toLowerCase().trim();
            const localImage = IMAGE_MAPPING[titleLower] || service.image;
            
            if (localImage) {
              return (
                <div
                  key={service.title}
                  className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={scrollToBooking}
                >
                  <img
                    src={localImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end p-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
              );
            } else {
              const IconComp = (LucideIcons as any)[service.icon_name || 'Leaf'] || LucideIcons.Leaf;
              return (
                <div
                  key={service.title}
                  className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6"
                  onClick={scrollToBooking}
                >
                  <div className="flex justify-between items-start">
                    <div className="bg-white/10 p-3 rounded-xl text-yellow-300 group-hover:scale-110 transition-transform duration-300">
                      <IconComp size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-yellow-200 transition-colors">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-xs text-green-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
