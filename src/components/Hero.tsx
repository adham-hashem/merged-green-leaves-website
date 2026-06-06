import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full min-h-[calc(100vh-72px)] flex flex-col justify-center items-center overflow-hidden bg-[#04200e] bg-no-repeat bg-cover bg-center md:bg-[position:85%_center] pt-4 pb-20 md:py-0 bg-hero-mobile md:bg-hero-desktop"
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Professional Gardening Services in Cambridge
        </h1>

        <p className="text-lg sm:text-2xl text-gray-100 mb-6 sm:mb-8 font-light">
          Transforming Gardens, Creating Beautiful Spaces
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => scrollToSection('booking')}
            className="group inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Book a Service
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:07961228431"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <Phone size={20} />
            Call Now
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
