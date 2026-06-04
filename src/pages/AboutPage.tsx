import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Clock, Smile, Award, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  useEffect(() => {
    // Dynamic SEO Optimization for About Page
    document.title = "About Us | Cambridge Green Leaves";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn more about Cambridge Green Leaves. We are a professional, local gardening and landscaping company in Cambridge, UK offering tree surgery, fencing, lawn care, and garden design.'
      );
    }
    
    // Dynamic Canonical Link Update
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.origin + window.location.pathname);
    }
    
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '6+', label: 'Years of Experience' },
    // { value: '500+', label: 'Happy Customers' },
    // { value: '100%', label: 'Satisfaction Rate' },
    { value: 'Fully', label: 'Insured & Certified' },
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Expert Craftsmanship',
      description: 'Our team consists of highly skilled gardeners and landscapers who take pride in bringing your outdoor vision to life with precision and attention to detail.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: 'Trusted & Insured',
      description: 'We are a fully insured local business, giving you total peace of mind while we transform your residential or commercial outdoor space.',
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: 'Reliable & Prompt',
      description: 'We value your time. We show up on schedule, work efficiently, maintain clean work sites, and finish projects within the agreed timeline.',
    },
    {
      icon: <Smile className="w-8 h-8 text-green-600" />,
      title: 'Customer-First Approach',
      description: 'Your satisfaction is our top priority. We listen carefully to your requirements, offer professional advice, and customize our services to suit your budget.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Initial Consultation',
      desc: 'Contact us or submit a booking. We schedule a convenient time to assess your garden and discuss your design ideas or maintenance needs.',
    },
    {
      num: '02',
      title: 'Free Detailed Quote',
      desc: 'We provide a transparent, itemized quote based on the size, scope, and specific requirements of your gardening or landscaping project.',
    },
    {
      num: '03',
      title: 'Expert Execution',
      desc: 'Our professional team carries out the work using advanced equipment and quality materials, adhering to the highest standards of safety and design.',
    },
    {
      num: '04',
      title: 'Final Handover',
      desc: 'We clean up the site, walk you through the completed project to ensure you are 100% satisfied, and provide ongoing garden care advice.',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner Section */}
        <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm">About Us</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Cambridge Green Leaves
            </h1>
            <p className="text-lg lg:text-xl text-green-100 max-w-3xl mx-auto font-light leading-relaxed">
              Transforming outdoor spaces across Cambridge and surrounding areas. We combine passion, expertise, and reliable service to create gardens you will love.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold group transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Image side */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                  <img
                    src="/reducedSizeImages/background_homepage.webp"
                    alt="Cambridge Green Leaves Landscaping Work"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -right-4 bg-yellow-400 text-gray-900 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-green-800 animate-spin-slow" />
                  <div>
                    <p className="font-bold text-lg leading-tight">Local Experts</p>
                    <p className="text-sm font-medium">Cambridge & Surrounds</p>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Your Trusted Partner in Garden Transformation
                </h2>
                
                <p className="text-gray-600 leading-relaxed">
                  Based in Cambridge, <strong>Cambridge Green Leaves</strong> provides a comprehensive suite of gardening and landscaping services. From designing breathtaking contemporary outdoor spaces to providing regular, reliable garden maintenance, we handle it all with precision and care.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  We believe that a garden is an extension of your home—a place to relax, play, entertain, and connect with nature. Our dedicated team of gardeners combines years of industry experience with a passion for landscaping, ensuring that every project is completed to the highest standards.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-green-50/50 rounded-2xl p-4 text-center border border-green-100/50">
                      <p className="text-3xl font-extrabold text-green-600">{stat.value}</p>
                      <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Core Values</h2>
              <p className="text-gray-600 mt-4">
                What drives our work and defines our commitment to providing the best gardening and landscaping services in Cambridgeshire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex gap-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-3 bg-green-50 rounded-2xl h-fit flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Process Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How We Work</h2>
              <p className="text-gray-600 mt-4">
                We believe in complete transparency and a seamless customer journey. Here is our step-by-step process for every landscaping project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, i) => (
                <div key={i} className="relative group">
                  {/* Vertical/Horizontal connector lines */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-8 left-[70%] right-[-30%] h-0.5 bg-green-100 z-0"></div>
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 font-extrabold text-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                      {step.num}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-900 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(234,179,8,0.15),transparent)]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Transform Your Garden?</h2>
            <p className="text-green-100 max-w-2xl mx-auto font-light">
              Get in touch with our friendly team today to discuss your garden project, request a site visit, or receive a free, no-obligation estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/#booking"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl group"
              >
                Book a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:07961228431"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all"
              >
                Call 07961228431
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
