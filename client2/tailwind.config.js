const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default withMT(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          'confetti-fall': {
            '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
            '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
          },
        },
        animation: {
          'confetti-fall': 'confetti-fall linear infinite',
        },
      },
    },
    plugins: [],
  }
)

