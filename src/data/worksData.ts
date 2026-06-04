export interface WorkProject {
  id: string;
  number: number;
  title: string;
  description: string;
  categories: string[];
  mainImage: string;
  images: string[];
}

export const worksProjects: WorkProject[] = [
  {
    id: 'pro1',
    number: 1,
    title: 'Modern Lawn Renovation',
    description: 'A complete lawn overhaul featuring pristine turfing and garden border lining to create a clean, modern aesthetic.',
    categories: ['Turfing', 'Landscaping'],
    mainImage: '/works/pro1.webp',
    images: ['/works/pro1.webp', '/works/pro1(b) (1).webp']
  },
  {
    id: 'pro2',
    number: 2,
    title: 'Complete Garden Clearance & Decking',
    description: 'Transformation of an overgrown space into an elegant garden with premium turfing, custom fencing, and structural tidy-up.',
    categories: ['Garden Clearance', 'Fencing', 'Turfing'],
    mainImage: '/works/pro2.webp',
    images: ['/works/pro2.webp', '/works/pro2(b).webp', '/works/pro2(c).webp']
  },
  {
    id: 'pro3',
    number: 3,
    title: 'Premium Turfing & Border Styling',
    description: 'Introduction of new turf and clean edges to define flower beds, resulting in a vibrant and welcoming garden area.',
    categories: ['Turfing', 'Landscaping'],
    mainImage: '/works/pro3.webp',
    images: ['/works/pro3.webp', '/works/pro3(b).webp']
  },
  {
    id: 'pro4',
    number: 4,
    title: 'Fencing Installation & Shrub Maintenance',
    description: 'Installation of high-quality timber fencing alongside detailed pruning of hedges and shrubs for enhanced privacy and neatness.',
    categories: ['Fencing', 'Hedges & Shrubs'],
    mainImage: '/works/pro4.webp',
    images: ['/works/pro4.webp', '/works/pro4(b).webp', '/works/pro4(c).webp']
  },
  {
    id: 'pro5',
    number: 5,
    title: 'Patio Paving & Lawn Overhaul',
    description: 'Ground leveling, professional turf laying, and clean patio borders creating a beautiful multi-purpose outdoor living area.',
    categories: ['Patios', 'Turfing', 'Landscaping'],
    mainImage: '/works/pro5.webp',
    images: ['/works/pro5.webp', '/works/pro5(b).webp', '/works/pro5(d).webp']
  },
  {
    id: 'pro6',
    number: 6,
    title: 'Large Property Landscaping & Tidy',
    description: 'An extensive landscape make-over including tree shaping, lawn leveling, rubbish clearance, and gravel pathways.',
    categories: ['Landscaping', 'Tree Surgery', 'Garden Clearance'],
    mainImage: '/works/pro6.webp',
    images: [
      '/works/pro6.webp',
      '/works/pro6(b).webp',
      '/works/pro6(c).webp',
      '/works/pro6(d).webp',
      '/works/pro6(f).webp',
      '/works/pro6(g).webp',
      '/works/pro6(h).webp'
    ]
  },
  {
    id: 'pro7',
    number: 7,
    title: 'Hedge Shaping & Lawn Cleanup',
    description: 'Precision trimming of dense boundary hedges combined with turf maintenance and garden waste clearance.',
    categories: ['Hedges & Shrubs', 'Garden Clearance'],
    mainImage: '/works/pro7(b).webp',
    images: [
      '/works/pro7(b).webp',
      '/works/pro7(d).webp',
      '/works/pro7(e).webp',
      '/works/pro7(f).webp',
      '/works/pro7(g).webp'
    ]
  },
  {
    id: 'pro8',
    number: 8,
    title: 'Bespoke Stone Patio & Lawn laying',
    description: 'Premium natural stone patio installation with precise drainage integration, surrounded by fresh lush turf.',
    categories: ['Patios', 'Turfing', 'Landscaping'],
    mainImage: '/works/pro8.webp',
    images: [
      '/works/pro8.webp',
      '/works/pro8(b).webp',
      '/works/pro8(c).webp',
      '/works/pro8(d).webp',
      '/works/pro8(f).webp'
    ]
  },
  {
    id: 'pro9',
    number: 9,
    title: 'Front Yard Turnaround & Pathway Repair',
    description: 'Restoration of front garden beds, fresh lawn turfing, and power washing of paths for a striking curb appeal.',
    categories: ['Landscaping', 'Turfing', 'Patios'],
    mainImage: '/works/pro9.webp',
    images: [
      '/works/pro9.webp',
      '/works/pro9(b).webp',
      '/works/pro9(c).webp',
      '/works/pro9(d).webp',
      '/works/pro9(f).webp'
    ]
  },
  {
    id: 'pro10',
    number: 10,
    title: 'Compact Backyard Cleanup & Maintenance',
    description: 'Efficient clearance of old vegetation, lawn re-seeding, fence repairs, and overall garden maintenance for a neat finish.',
    categories: ['Garden Clearance', 'Fencing', 'Hedges & Shrubs'],
    mainImage: '/works/pro10.webp',
    images: ['/works/pro10.webp', '/works/pro10(b).webp', '/works/pro10(c).webp']
  }
];

export const allWorksCategories = [
  'All',
  'Landscaping',
  'Turfing',
  'Fencing',
  'Patios',
  'Hedges & Shrubs',
  'Garden Clearance',
  'Tree Surgery'
];
