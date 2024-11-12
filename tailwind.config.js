/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        SanFe: {
          500: '#D09ADC',
        },
        EatBetterCo: {
          500: '#603a38',
        },
        CountryBean: {
          500: '#bf6a57',
        },
        PlusGold: {
          500: '#c4963c',
        },
        Deciwood: {
          500: '#1c1c1c',
        }
      },
    },
  },
  plugins: [],
}