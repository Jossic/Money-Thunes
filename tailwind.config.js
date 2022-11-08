module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#dfd0d0',
        secondary: '#1374CD'
      },
      backgroundImage: {
        moneythunes: "url('./asset/Logo_moneYthunes.png')"
      }
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      // bigger smartphone / tablet or little pc
      mdlg: '900px'
    }
  },
  plugins: []
};
