/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:{
    colors:{
      "base-400" : "#072f7c",
      "logo" : "#dc7374",
      "navbar":"#9db1f7"
    }
  },
  plugins: [require("daisyui"),  function ({ addUtilities }) {
    const newUtilities = {
      '.ul-list-color': {
        'ul li': {
          color: '#FFFFFF', // Or use theme('colors.customColor')
        },
      },
    }
    addUtilities(newUtilities, ['responsive', 'hover'])
  }],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff00ff",

          "secondary": "#ff00ff",

          "accent": "#00ffff",

          "neutral": "#ff00ff",

          "base-100": "#4396d9",

          "base-400" : "#072f7c", 

          "info": "#0000ff",

          "success": "#00ff00",

          "warning": "#00ff00",

         " error": "#ff0000",
        },
      },
      "light",
      "dark",
    ],
  },
};
