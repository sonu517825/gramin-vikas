/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      colors: {
        primary: '#007BFF', // Replace this with your desired primary color
      },
    },
  },
  variants: {},
  plugins: [],
}
