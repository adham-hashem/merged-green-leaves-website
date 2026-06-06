import { Phone, Mail, MapPin, Star, ExternalLink, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-300">Contact us today for a free consultation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a
            href="tel:07961228431"
            className="group bg-gradient-to-br from-green-700 to-green-800 p-8 rounded-3xl hover:shadow-lg hover:shadow-green-500/50 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-colors">
                <Phone className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-green-50 text-lg font-medium">07961228431</p>
                <p className="text-green-200 text-sm mt-1">Call us anytime</p>
              </div>
            </div>
          </a>

          <a
            href="mailto:greenleaves132@hotmail.co.uk"
            className="group bg-gradient-to-br from-yellow-500 to-yellow-600 p-8 rounded-3xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-colors">
                <Mail className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-yellow-50 text-lg font-medium break-all">greenleaves132@hotmail.co.uk</p>
              </div>
            </div>
          </a>

          <a
            href="https://www.facebook.com/greenleavesgardness"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-blue-700 to-blue-800 p-8 rounded-3xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-colors">
                <Facebook className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Facebook</h3>
                <p className="text-blue-50 text-lg font-medium break-all">greenleavesgardness</p>
                <p className="text-blue-200 text-sm mt-1">Visit our page</p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location details card */}
          <div className="p-8 bg-white/10 backdrop-blur rounded-3xl border border-white/20 flex items-start gap-4 shadow-lg">
            <div className="bg-white/20 p-4 rounded-xl flex-shrink-0">
              <MapPin className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Location & Service Area</h3>
              <p className="text-gray-300 text-lg">132 Flamsteed Close, Cambridge, CB1 3FE</p>
              <p className="text-gray-400 text-sm mt-2">Serving Cambridge and surrounding areas | Commercial & residential projects</p>
            </div>
          </div>

          {/* Eye-catching Google Review Card */}
          <a
            href="https://g.page/r/CXnFitKlbSsjEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 bg-gray-950/90 rounded-3xl border-2 border-yellow-400/40 hover:border-yellow-400/90 shadow-xl shadow-yellow-500/5 hover:shadow-yellow-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Radial background glow on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-500 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-pulse"
                    style={{ animationDelay: `${i * 150}ms`, animationDuration: '2s' }}
                  />
                ))}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  Review Us on Google
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Have we recently transformed your garden or landscaping? We would love to hear your feedback! Your reviews help others find us and support our local team in Cambridge.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between relative z-10">
              <span className="text-gray-400 text-xs font-semibold">Takes under 1 minute</span>
              <span className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-transform transform group-hover:scale-105 duration-300">
                <span>Leave a Review</span>
                <ExternalLink size={16} />
              </span>
            </div>
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            We're committed to providing exceptional service and transforming your outdoor spaces into beautiful havens.
          </p>
        </div>
      </div>
    </section>
  );
}
