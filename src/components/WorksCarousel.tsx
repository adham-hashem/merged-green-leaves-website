import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { worksProjects } from '../data/worksData';

export default function WorksCarousel() {
  // Use first 5 projects for the home page carousel
  const carouselProjects = worksProjects.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<any>(null);

  // Swipe gesture detection refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselProjects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselProjects.length) % carouselProjects.length);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Helper to prepend import.meta.env.BASE_URL so images load properly in subfolders/all platforms
  const resolveAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}${cleanPath}`;
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isHovered) {
      autoPlayTimer.current = setInterval(() => {
        nextSlide();
      }, 5000); // changes slides every 5 seconds
    } else {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [isHovered, activeIndex]);

  return (
    <section 
      className="py-16 sm:py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden"
      id="works-carousel-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-4 border border-green-200">
            <Sparkles size={16} className="text-green-600 animate-pulse" />
            <span>Featured Project Showcases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Works Gallery
          </h2>
          <p className="text-lg text-gray-650 max-w-2xl mx-auto">
            Take a look at some of the beautiful outdoor spaces we have recently designed, renovated, and maintained.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:max-h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-gray-950 group cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          {carouselProjects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  isActive 
                    ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image */}
                <img
                  src={resolveAssetUrl(project.mainImage)}
                  alt={`${project.title} - Gardening transformation in Cambridge`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Glassmorphic Info Panel Overlay */}
                <div className={`absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-white shadow-2xl transition-all duration-700 delay-300 transform ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {/* Category badgess */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.categories.map((cat) => (
                      <span 
                        key={cat} 
                        className="bg-green-700/80 text-white text-xs font-bold px-3 py-1 rounded-full border border-green-500/20 backdrop-blur-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 text-white tracking-tight drop-shadow-md">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-gray-200 line-clamp-2 md:line-clamp-none mb-4 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-yellow-300 font-bold text-xs uppercase tracking-wider">
                    <Leaf size={14} className="animate-bounce" />
                    <span>Project #{project.number}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Floating Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-green-700/80 backdrop-blur-md text-white border border-white/10 hover:border-green-500/30 hover:scale-110 active:scale-95 transition-all shadow-xl opacity-0 group-hover:opacity-100 focus:opacity-100 hidden sm:flex items-center justify-center cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-green-700/80 backdrop-blur-md text-white border border-white/10 hover:border-green-500/30 hover:scale-110 active:scale-95 transition-all shadow-xl opacity-0 group-hover:opacity-100 focus:opacity-100 hidden sm:flex items-center justify-center cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex gap-2">
            {carouselProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-green-500 w-8 shadow-lg shadow-green-500/50'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Show More / Call to Action */}
        <div className="mt-12 text-center">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-750 text-white font-extrabold text-base md:text-lg py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-700/20 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-98 transition-all duration-350 cursor-pointer border border-green-600/30"
          >
            <span>Show More Works</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
