/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "base-400": "#072f7c",
        logo: "#dc7374",
        navbar: "#9db1f7",
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
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes:  ["light", "dark"],
  },
};
