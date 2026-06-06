/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-mobile': "url('/reducedSizeImages/background_homepage_mobile.webp')",
        'hero-desktop': "url('/reducedSizeImages/background_homepage.webp')",
      },
    },
  },
  plugins: [],
};

