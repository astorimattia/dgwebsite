/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'gt-america-thin': ['GT America Thin', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'gt-america-regular': ['GT America Regular', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'logo': '25px',
        'mobile-logo': '22px',
      },
      spacing: {
        'sidebar-width': '240px',
        'sidebar-width-mobile': '200px',
      },
      height: {
        '80vh': '80vh',
        '75vh': '75vh',
        '70vh': '70vh',
        '65vh': '65vh',
      },
      minHeight: {
        '80vh': '80vh',
        '75vh': '75vh',
        '70vh': '70vh',
        '65vh': '65vh',
      },
      maxHeight: {
        '80vh': '80vh',
        '75vh': '75vh',
        '70vh': '70vh',
        '65vh': '65vh',
      },
      maxWidth: {
        'gallery': '1200px',
        'about-content': '500px',
        'about-section': '1000px',
      },
      letterSpacing: {
        'tight': '-0.01em',
      },
      fontFeatureSettings: {
        'ss01': '"ss01" 1',
        'kern': '"kern" 1',
        'liga': '"liga" 1',
      },
    },
  },
  plugins: [],
}
