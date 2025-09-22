/** @type {import('tailwindcss').Config} */

theme = {
  // Light-mode colors
  'grayscale': {
    '50': '#FAFAFA',
    '100': '#F5F5F5',
    '200': '#D4D4D4',
    '500': '#737373',
    '700': '#404040',
    '900': '#171717',
  },
  'primary': {
    '500': '#D99864',
    '600': '#A6754C',
    '800': '#5A3F29',
    '900': '#402D1D'
  },
  'cta': {
    '50': '#EFF6FF',
    '500': '#28BED6',
    '600': '#2B94A6',
    '700': '#247D8C'
  },
  'grey': '#A0A0A0',
  'warning': '#EE0000',
  'dark': '#1E1E1E',


  // Dark-mode colors
  'dark-grayscale': {
    '50': '#171717',
    '100': '#404040',
    '200': '#737373',
    '500': '#D4D4D4',
    '700': '#F5F5F5',
    '900': '#FAFAFA',
  },
  'dark-primary': {
    '500': '#402D1D',
    '600': '#5A3F29',
    '800': '#A6754C',
    '900': '#D99864'
  },
  'dark-cta': {
    '50': '#EFF6FF',
    '500': '#2B94A6',
    '600': '#2196F3',
    '700': '#1D4ED8'
  },
  'dark-grey': '#222222',
  'dark-warning': '#EE0000',
  'dark-dark': '#DDDDDD',
}

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    screens: {
      '3xs': '384px',
      '2xs': '448px',
      'xs': '512px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundColor: theme,
      textColor: theme,
      shadowColor: theme,
      borderColor: theme,
      gradientColorStops: theme,
      colors: theme,
      borderWidth: {
        "1": "1px"
      },
      height: {
        'picture-modal-content-height': 'calc(100vh)',
        'picture-modal-picture-height': 'calc(100vh - 2rem)',
        'picture-modal-comment-section-height': 'calc(100vh - 23rem)',
      },
      boxShadow: {
        'top': '0px -2px 4px rgba(0, 0, 0, 0.075)',
        'center': '0px 0px 15px rgba(0, 0, 0, 0.125)',
      },
      padding: {
        'xs': '4px', // 1
        'sm': '8px', // 2
        'md': '16px', // 3, 4
        'lg': '20px', // 5
        'xl': '24px', // 6+
      },
      margin: {
        'xs': '4px', // 1
        'sm': '8px', // 2
        'md': '16px', // 3, 4
        'lg': '20px', // 5
        'xl': '24px', // 6+
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
      },
      gap: {
        'xs': '4px', // 1
        'sm': '8px', // 2
        'md': '16px', // 3, 4
        'lg': '20px', // 5
        'xl': '24px', // 6+
      },
    }
  },
  plugins: [],
}
