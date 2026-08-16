// Tailwind v4 ships its own PostCSS plugin; autoprefixer is no longer needed
// (v4 handles vendor prefixing internally via Lightning CSS).
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
