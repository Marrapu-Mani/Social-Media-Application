/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#f5c32c',
      'orange': '#fca61f',
      'black': '#242d49',
      'gray': 'rgba(36, 45, 73, 0.65)',
      'hrColor': '#cfcdcd',
      'cardColor': 'rgba(255, 255, 255, 0.64)',
      'inputColor': 'rgba(40, 52, 62, 0.07)',
      'photo': '#4CB256',
      'video': '#4A4EB7',
      'location': '#EF5757',
      'shedule': '#E1AE4A',
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'buttonBg': 'linear-gradient(98.63deg, #E2B5E3 0%, #8E57FD 100%)',
      },
      boxShadow: {
        'profileShadow': '0px 4px 17px 2px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
