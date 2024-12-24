/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Tusker: {
          500: '#ff0808',
        },
        EatBetterCo: {
          500: '#603a38',
        },
        CavendishOnline: {
          500: '#840544',
        },
        LloydLiving: {
          500: '#11b67a',
        },
        BankOfScotland: {
          500: '#06276a',
        }
      },
    },
  },
  plugins: [],
}