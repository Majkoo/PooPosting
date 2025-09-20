/** @type {import('tailwindcss').Config} */

theme = {
  // Light-mode colors
  'grayscale': {
    'white': '#FAFAFA',
    'dark-white': '#F5F5F5',
    'light-gray': '#D4D4D4',
    'dark-gray': '#737373',
    'light-black': "#404040",
    'black': "#171717",
  },
  'primary': {
    'tone': '#D99864',
    'light': '#A6754C',
    'base': '#5A3F29',
    'dark': '#402D1D'
  },
  'cta': {
    'lightest': '#EFF6FF',
    'light': '#28BED6',
    'base': '#2B94A6',
    'dark': '#247D8C'
  },
  'grey': '#A0A0A0',
  'warning': '#EE0000',
  'dark': '#1E1E1E',


  // Dark-mode colors
  'dark-grayscale': {
    'white': '#171717',
    'dark-white': '#404040',
    'light-gray': '#737373',
    'dark-gray': '#D4D4D4',
    'light-black': "#F5F5F5",
    'black': "#FAFAFA",
  },
  'dark-primary': {
    'tone': '#402D1D',
    'light': '#5A3F29',
    'base': '#A6754C',
    'dark': '#D99864'
  },
  'dark-cta': {
    'lightest': '#EFF6FF',
    'light': '#2B94A6',
    'base': '#2196F3',
    'dark': '#1D4ED8'
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
        'XS': '4px', // 1
        'SM': '8px', // 2
        'MD': '16px', // 3, 4
        'LG': '20px', // 5
        'XL': '24px', // 6+
      },
      margin: {
        'XS': '4px', // 1
        'SM': '8px', // 2
        'MD': '16px', // 3, 4
        'LG': '20px', // 5
        'XL': '24px', // 6+
      },
      borderRadius: {
        'XS': '4px',
        'SM': '8px',
        'MD': '16px',
        'LG': '20px',
        'XL': '24px',
      },
      gap: {
        'XS': '4px', // 1
        'SM': '8px', // 2
        'MD': '16px', // 3, 4
        'LG': '20px', // 5
        'XL': '24px', // 6+
      },
    }
  },
  plugins: [],
}
