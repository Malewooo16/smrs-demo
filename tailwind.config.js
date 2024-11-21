/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#001f3f", // Darkest Navy
          800: "#004080", // Dark Blue
        },
        gray: {
          200: "#e5e7eb", // Light Gray
        },
        teal: {
          400: "#38b2ac", // Teal for links
          300: "#4fd1c5", // Lighter teal for hover state
        },

        landing: "#0f172a",
        logo: "#dc7374",
        outline: "#242849",
        sidebar: {
          300: "#242849",
          500: "#0e0c28",
        },

        burgundy: {
          DEFAULT: "#800020",
          50: "#fdf2f2",
          100: "#f9d6d7",
          200: "#f3a3a5",
          300: "#ec7173",
          400: "#e74a4f",
          500: "#e02020",
          600: "#ca1d1f",
          700: "#a51718",
          800: "#7f1011",
          900: "#66080a",
        },
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./main-components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("daisyui"),
    function ({addComponents, addUtilities}) {
      // Reusable component classes
      addComponents({
        ".input-base": {
          "@apply mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500":
            {},
        },
        ".label-base": {
          "@apply block text-gray-700 font-semibold": {},
        },
        ".btn-submit": {
          "@apply btn w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500":
            {},
        },
      });
    },
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
};
