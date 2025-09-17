/** @type {import('tailwindcss').Config} */

theme = {
  // Light-mode colors
  'surface': {
    '100': '#FFFFFF',
    '200': '#FBFBFB',
    '300': '#f1f1f1',
    '400': '#EDEDED',
    '500': "#DBDBDB",
    '600': "#CCCCCC",
  },
  'primary': {
    '800': '#5A3F29',
    '900': '#372719'
  },
  'cta': {
    DEFAULT: '#2B94A6',
    '100': '#EFF6FF',
    '300': '#2196F3',
    '400': '#1D4ED8'
  },
  'grey': '#A0A0A0',
  'warning': '#EE0000',
  'dark': '#1E1E1E',


  // Dark-mode colors
  'dark-surface': {
    '100': '#222222',
    '200': '#444444',
    '300': '#666666',
    '400': '#888888',
    '500': "#AAAAAA",
    '600': "#CCCCCC",
  },
  'dark-primary': {
    '800': '#666666',
    '900': '#666666'
  },
  'dark-cta': {
    DEFAULT: '#2B94A6',
    '100': '#80b7ff',
    '300': '#1a7dff',
    '400': '#0063e6'
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
    }
  },
  plugins: [],
}
