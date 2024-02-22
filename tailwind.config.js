/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Set your desired width for xs breakpoint
      },
    },
  },
  plugins: [],
};
