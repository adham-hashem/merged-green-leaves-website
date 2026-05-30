import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    // Dynamic SEO Optimization
    document.title = "Privacy Policy - Cambridge Green Leaves";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Privacy Policy for Cambridge Green Leaves. Learn how we handle your personal information and maintain your privacy.');
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
              <Shield className="w-12 h-12 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Last updated: May 2026. Your privacy and the protection of your personal data is very important to us.
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

              {/* Policy Content */}
              <div className="prose prose-green max-w-none text-gray-600 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">1. Introduction</h2>
                  <p className="leading-relaxed">
                    Cambridge Green Leaves ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, book services with us, or contact us.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">2. Information We Collect</h2>
                  <p className="leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us when you fill out forms on our website, make bookings, or contact us via email or phone. This information may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact details such as your name, email address, phone number, and physical address.</li>
                    <li>Details about your garden, site dimensions, and the specific gardening/landscaping services you require.</li>
                    <li>Any other information you choose to provide in booking details or inquiries.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">3. How We Use Your Information</h2>
                  <p className="leading-relaxed mb-4">
                    We use the information we collect to provide and improve our services, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processing, managing, and scheduling your gardening and landscaping bookings.</li>
                    <li>Sending you quotes, booking confirmations, invoices, and updates.</li>
                    <li>Responding to your inquiries and resolving any customer support requests.</li>
                    <li>Analyzing website traffic and usage to improve our design and digital experience.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">4. Sharing and Disclosure</h2>
                  <p className="leading-relaxed">
                    We value your trust and do not sell, trade, or rent your personal information to third parties. We will only share details with trusted service providers or subcontractors if absolutely necessary to execute your requested landscaping or garden services, or when required by law to comply with legal processes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">5. Data Security</h2>
                  <p className="leading-relaxed">
                    We implement appropriate technical and organizational measures to maintain the security of your personal data. However, please be aware that no transmission of data over the internet or storage system can be guaranteed to be 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">6. Your Rights</h2>
                  <p className="leading-relaxed">
                    You have the right to request access to the personal data we hold about you, request corrections to incorrect data, or request the deletion of your personal data from our systems. To exercise any of these rights, please contact us using the details below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-100 pb-2">7. Contact Us</h2>
                  <p className="leading-relaxed mb-6">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please feel free to reach out to us:
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
