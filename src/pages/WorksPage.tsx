import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Leaf, Sparkles, ArrowLeft, Maximize2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { worksProjects, allWorksCategories, WorkProject } from '../data/worksData';

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<WorkProject[]>([]);
  
  // Lightbox States
  const [activeProject, setActiveProject] = useState<WorkProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // SEO and Head updates
  useEffect(() => {
    document.title = "Our Works Portfolio | Cambridge Green Leaves - Landscaping & Gardening Gallery";
    
    // Dynamic meta description update
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore our comprehensive works portfolio containing high-quality fencing, turfing, decking, patios, and complete garden transformations across Cambridge. See our projects today!');
    }

    // Dynamic Canonical Link Update
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.origin + window.location.pathname);
    }
    
    window.scrollTo(0, 0);
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(worksProjects);
    } else {
      const filtered = worksProjects.filter((project) =>
        project.categories.includes(selectedCategory)
      );
      setFilteredProjects(filtered);
    }
  }, [selectedCategory]);

  // Lightbox Navigation Functions
  const handleOpenLightbox = (project: WorkProject, imgIndex: number = 0) => {
    setActiveProject(project);
    setActiveImageIndex(imgIndex);
  };

  const handleCloseLightbox = () => {
    setActiveProject(null);
    setActiveImageIndex(0);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProject) return;
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        handleCloseLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header activeSection="works" />
      
      <main className="flex-1">
        {/* Top Banner Hero */}
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-16 sm:py-24 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-green-200 hover:text-white font-semibold mb-6 transition-colors group cursor-pointer"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-10 h-10 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Our Completed Projects</h1>
            </div>
            
            <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Explore the quality and depth of our craftsmanship. From turfing and paving to entire garden renovations, these projects show our work throughout Cambridge.
            </p>
          </div>
        </div>

        {/* Project Section */}
        <div className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category Filter Bar */}
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center mb-4">
                Filter Projects by Service
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
                {allWorksCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm border cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-green-700 text-white border-green-700 shadow-md shadow-green-700/20 scale-105'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-green-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
                <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-4">No projects match the selected category right now.</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-xl transition-all"
                >
                  Show All Projects
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col border border-gray-100/50"
                  >
                    {/* Image Container */}
                    <div 
                      className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => handleOpenLightbox(project, 0)}
                    >
                      <img
                        src={project.mainImage}
                        alt={`${project.title} - Cambridge landscaping`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/95 text-green-800 rounded-full p-4 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-500 flex items-center gap-2 font-bold text-sm">
                          <Maximize2 size={18} />
                          <span>View Gallery ({project.images.length})</span>
                        </div>
                      </div>

                      {/* Project Number Badge */}
                      <div className="absolute top-4 left-4 bg-green-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                        <Sparkles size={12} className="text-yellow-400" />
                        <span>Project #{project.number}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Categories List */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.categories.map((cat) => (
                            <span 
                              key={cat} 
                              className="bg-green-50 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded border border-green-250/20"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </div>

                      {/* Small project image strip on card */}
                      {project.images.length > 1 && (
                        <div className="border-t border-gray-100 pt-4 mt-2">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                            Project Photos ({project.images.length})
                          </span>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {project.images.map((img, idx) => (
                              <button
                                key={img}
                                onClick={() => handleOpenLightbox(project, idx)}
                                className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 hover:border-green-600 transition-all flex-shrink-0 cursor-pointer"
                              >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-300"
          onClick={handleCloseLightbox}
        >
          {/* Top Panel Controls */}
          <div className="flex justify-between items-start w-full max-w-7xl mx-auto z-10 text-white mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-green-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Project #{activeProject.number}
                </span>
                <span className="text-gray-400 text-xs font-semibold">
                  Photo {activeImageIndex + 1} of {activeProject.images.length}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-md">
                {activeProject.title}
              </h4>
            </div>
            
            <button
              onClick={handleCloseLightbox}
              className="bg-white/10 hover:bg-red-600 text-white rounded-full p-2.5 transition-colors focus:outline-none flex items-center justify-center cursor-pointer shadow-lg border border-white/5"
              title="Close Gallery (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Visual Carousel Area */}
          <div className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 relative">
            {/* Nav - Left */}
            {activeProject.images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-0 md:left-4 z-25 bg-black/55 hover:bg-green-700 text-white border border-white/10 rounded-full p-3.5 hover:scale-105 active:scale-95 transition-all focus:outline-none hidden sm:flex items-center justify-center cursor-pointer shadow-2xl"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Dynamic Active Image Rendering */}
            <div 
              className="flex-1 h-full max-h-[68vh] md:max-h-[72vh] w-full flex items-center justify-center overflow-hidden rounded-2xl relative select-none"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking image
            >
              <img
                key={`${activeProject.id}-${activeImageIndex}`}
                src={activeProject.images[activeImageIndex]}
                alt={`${activeProject.title} - view`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-450"
              />
            </div>

            {/* Nav - Right */}
            {activeProject.images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-0 md:right-4 z-25 bg-black/55 hover:bg-green-700 text-white border border-white/10 rounded-full p-3.5 hover:scale-105 active:scale-95 transition-all focus:outline-none hidden sm:flex items-center justify-center cursor-pointer shadow-2xl"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Selection Panel */}
          <div 
            className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4 z-10 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Description display in lightbox */}
            <p className="text-gray-300 text-xs md:text-sm text-center font-medium max-w-md line-clamp-2 md:line-clamp-none drop-shadow-sm">
              {activeProject.description}
            </p>

            {/* Thumbnails strip */}
            {activeProject.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto max-w-full pb-1 justify-center">
                {activeProject.images.map((img, idx) => {
                  const isCurrent = idx === activeImageIndex;
                  return (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        isCurrent ? 'border-yellow-400 scale-110 shadow-lg' : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Small Navigation for Mobile */}
            {activeProject.images.length > 1 && (
              <div className="flex gap-4 sm:hidden w-full px-4">
                <button
                  onClick={handlePrevImage}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl py-3 text-sm font-semibold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  onClick={handleNextImage}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl py-3 text-sm font-semibold transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
