/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loaderAnimation: {
          '0%, 100%': { transform: 'translateX(1000px)' },
              '50%': { transform: 'translateX(100px)' }
        }
    },
    animation: {
      loader: 'loaderAnimation 1s ease-in-out infinite',
    }
  },
  plugins: [],
}
}
