import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] flex flex-col justify-center md:block overflow-hidden bg-gradient-to-b from-[#04200e] via-[#0b3d1c] to-[#04200e] py-6 md:py-0">
      {/* Desktop Background Image Layer */}
      <div
        className="absolute inset-0 hidden md:block bg-no-repeat bg-center bg-cover md:bg-[position:85%_center]"
        style={{
          backgroundImage: 'url("/reducedSizeImages/background_homepage.webp")',
        }}
      />
      <div className="absolute inset-0 bg-black/40 hidden md:block" />

      {/* Mobile Background Image Layer & Header Content */}
      <div
        className="relative w-full aspect-[16/9] md:hidden bg-no-repeat bg-center bg-cover flex items-center justify-center shadow-lg"
        style={{
          backgroundImage: 'url("/reducedSizeImages/background_homepage.webp")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-white leading-tight">
            Professional Gardening Services in Cambridge
          </h1>
          <p className="text-xs sm:text-base text-gray-200 mt-1.5 font-light">
            Transforming Gardens, Creating Beautiful Spaces
          </p>
        </div>
      </div>

      {/* Main Content Container (Buttons & Desktop Typography) */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 mt-8 md:mt-0 md:py-0 md:min-h-[600px] flex flex-col justify-center text-center">
        {/* Desktop-only Typography */}
        <div className="hidden md:block">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Gardening Services in Cambridge
          </h1>
          <p className="text-2xl text-gray-100 mb-8 font-light">
            Transforming Gardens, Creating Beautiful Spaces
          </p>
        </div>

        {/* Buttons (visible on both mobile and desktop) */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => scrollToSection('booking')}
            className="group inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
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

      {/* Fade-out Gradient at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
