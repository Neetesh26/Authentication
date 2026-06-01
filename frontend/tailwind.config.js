export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 24px 90px rgba(15, 23, 42, 0.38)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 25%), radial-gradient(circle at bottom, rgba(16,185,129,0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
};
