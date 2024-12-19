/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'lexend': ["Lexend", 'sans-serif'],
      },
    
      colors:{
        'primary': '#2A4898',
        'secondary': '#FBFAFA',
         'search': '#E8E2E2',
         'paginate-br' : '#BDBDBD',
        'paginate-bg' : '#F3F3F3',
      }
    },
  },
  plugins: [],
}

//#21409A #FBFAFA