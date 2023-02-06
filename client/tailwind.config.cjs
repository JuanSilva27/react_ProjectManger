/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  variant:{
    extend:{
      display:["group-focus"],
      opacity:["group-focus"],
      inset:["group-focus"],
    }
  },
  plugins: [],
}
