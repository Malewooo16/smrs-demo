import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  plugins: [require("daisyui")],
  themes: [
    {
      light: {
        ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        ".btn-twitter": {
          "background-color": "#1EA1F1",
          "border-color": "#1EA1F1",
        },
        ".btn-twitter:hover": {
          "background-color": "#1C96E1",
          "border-color": "#1C96E1",
        },
      },
    },
  ],

}
export default config
