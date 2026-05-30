import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  useEffect(() => {
    // Dynamic SEO Optimization
    document.title = "Terms of Service - Cambridge Green Leaves";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Terms of Service for Cambridge Green Leaves. Read our terms regarding bookings, payments, and gardening services in Cambridge.');
    }
    
    // Dynamic Canonical Link Update
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.origin + window.location.pathname);
    }
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner Section */}
        <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-12 h-12 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl lg:text-5xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Please read these terms carefully before booking our professional gardening or landscaping services.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              {/* Back Button */}
              <div className="mb-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold group transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </div>

              {/* Terms Content */}
              <div className="prose prose-green max-w-none text-gray-600 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">1. Agreement to Terms</h2>
                  <p className="leading-relaxed">
                    By accessing our website and/or scheduling any gardening, landscaping, clearance, tree surgery, or hedge services with Cambridge Green Leaves, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">2. Services Offered</h2>
                  <p className="leading-relaxed">
                    We offer professional gardening, clearance, tree surgery, hedge trimming, turfing, fencing, and landscaping services. All estimates and descriptions of services are provided in good faith. We reserve the right to modify, suspend, or discontinue any service at any time without notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">3. Bookings, Quotes & Cancellations</h2>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Quotes:</strong> All quotes provided via the website or telephone are provisional. A final binding quote is provided after site evaluation (either in person or through clear site photographs/dimensions).</li>
                    <li><strong>Cancellations:</strong> If you need to cancel or reschedule your service, please notify us at least 48 hours in advance. Cancellations made less than 48 hours before the scheduled time may be subject to a cancellation fee.</li>
                    <li><strong>Weather & Delays:</strong> Gardening and landscaping depend highly on weather conditions. In cases of severe weather, we reserve the right to reschedule the service to the next available date.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">4. Access, Water, and Electricity</h2>
                  <p className="leading-relaxed">
                    The client must ensure proper access to the garden or site at the scheduled time. Unless negotiated beforehand, the client agrees to provide access to basic water and electrical utilities if required for the tools and completion of services.
                    We are not responsible for delays caused by lack of proper site access.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">5. Pricing & Payments</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payments are due immediately upon completion of the service, unless prior written terms are agreed upon.</li>
                    <li>We accept bank transfer and cash payment methods.</li>
                    <li>Late payments may be subject to administration charges and interest.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">6. Waste Removal</h2>
                  <p className="leading-relaxed">
                    Green waste disposal is subject to local regulations. Our quotes will specify whether green waste clearance and disposal costs are included in the price or charged separately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">7. Liability & Disclaimers</h2>
                  <p className="leading-relaxed">
                    While we take the utmost care during operations, we are not liable for damage to hidden utilities (pipes, wires, cables) that were not clearly marked or disclosed by the client prior to commencing work. We carry public liability insurance to cover any standard accidental damages resulting directly from our negligence.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">8. Contact Details</h2>
                  <p className="leading-relaxed mb-6">
                    If you have any questions or require clarification regarding these terms, please contact us:
                  </p>
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex flex-col md:flex-row gap-6 md:justify-around text-gray-800">
                    <a href="mailto:greenleaves132@hotmail.co.uk" className="flex items-center gap-3 hover:text-green-600 transition-colors">
                      <Mail className="text-green-600 w-5 h-5 flex-shrink-0" />
                      <span>greenleaves132@hotmail.co.uk</span>
                    </a>
                    <a href="tel:07961228431" className="flex items-center gap-3 hover:text-green-600 transition-colors">
                      <Phone className="text-green-600 w-5 h-5 flex-shrink-0" />
                      <span>07961228431</span>
                    </a>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-green-600 w-5 h-5 flex-shrink-0" />
                      <span>Cambridge, United Kingdom</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <Link
                  to="/#booking"
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
