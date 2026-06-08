import { useState, useEffect, useCallback } from 'react';
import { Leaf, TreeDeciduous, Flower2, ChevronLeft, ChevronRight, Sprout } from 'lucide-react';

interface Tip {
  icon: React.ElementType;
  category: string;
  text: string;
}

const tips: Tip[] = [
  { icon: Sprout, category: 'Lawn Care', text: 'Water your lawn early in the morning for healthier growth.' },
  { icon: Sprout, category: 'Lawn Care', text: 'Avoid cutting more than one-third of the grass height at a time.' },
  { icon: Sprout, category: 'Lawn Care', text: 'Feed your lawn seasonally to maintain a rich green appearance.' },
  { icon: TreeDeciduous, category: 'Tree & Shrub Care', text: 'Prune trees during the correct season to encourage healthy growth.' },
  { icon: TreeDeciduous, category: 'Tree & Shrub Care', text: 'Apply mulch around trees to retain moisture and protect roots.' },
  { icon: TreeDeciduous, category: 'Tree & Shrub Care', text: 'Regular inspections help prevent disease and pest issues.' },
  { icon: Flower2, category: 'Seasonal', text: 'Spring: Prepare beds and fertilize plants for the growing season.' },
  { icon: Flower2, category: 'Seasonal', text: 'Summer: Water deeply during dry periods to keep roots healthy.' },
  { icon: Flower2, category: 'Seasonal', text: 'Autumn: Remove fallen leaves and prepare your garden for winter.' },
  { icon: Flower2, category: 'Seasonal', text: 'Winter: Protect delicate plants from frost with covers and mulch.' },
];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  'Lawn Care': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'Tree & Shrub Care': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Seasonal': { bg: 'bg-lime-100', text: 'text-lime-700', dot: 'bg-lime-500' },
};

export default function GardenCareTips() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToTip = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning]
  );

  const nextTip = useCallback(() => {
    goToTip((currentIndex + 1) % tips.length);
  }, [currentIndex, goToTip]);

  const prevTip = useCallback(() => {
    goToTip((currentIndex - 1 + tips.length) % tips.length);
  }, [currentIndex, goToTip]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextTip, 5000);
    return () => clearInterval(timer);
  }, [nextTip, isPaused]);

  const tip = tips[currentIndex];
  const colors = categoryColors[tip.category] || categoryColors['Lawn Care'];
  const IconComponent = tip.icon;

  return (
    <div
      className="relative -mt-16 z-20 max-w-2xl mx-auto px-4 sm:px-6 mb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Floating animation wrapper */}
      <div className="animate-[float_6s_ease-in-out_infinite]">
        {/* Glassmorphism Card */}
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-green-900/10 p-6 sm:p-8 overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-100/40 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-100/30 rounded-full blur-2xl"></div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-600/20">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-xl bg-green-400/30 animate-[ping_3s_ease-in-out_infinite]"></div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Garden Care Tips</h3>
              <p className="text-xs text-gray-500">Expert advice for your garden</p>
            </div>
          </div>

          {/* Tip Content with Fade */}
          <div
            className={`transition-all duration-300 ${
              isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Category Badge */}
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text} text-xs font-semibold px-3 py-1 rounded-full`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                {tip.category}
              </span>
            </div>

            {/* Tip Text */}
            <div className="flex items-start gap-3">
              <IconComponent
                className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
                {tip.text}
              </p>
            </div>
          </div>

          {/* Navigation & Progress */}
          <div className="flex items-center justify-between mt-6">
            {/* Progress Dots */}
            <div className="flex items-center gap-1.5">
              {tips.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToTip(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to tip ${i + 1}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'w-6 h-2 bg-green-600'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTip}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 flex items-center justify-center transition-colors"
                aria-label="Previous tip"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextTip}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 flex items-center justify-center transition-colors"
                aria-label="Next tip"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 pt-4 border-t border-gray-200/60">
            <button
              onClick={() => {
                const el = document.getElementById('booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-semibold text-green-700 hover:text-green-800 transition-colors inline-flex items-center gap-1.5 group"
            >
              Need Professional Help?
              <span className="text-yellow-600 group-hover:text-yellow-700 transition-colors">
                Book a Garden Consultation
              </span>
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
