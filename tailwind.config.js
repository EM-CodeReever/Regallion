/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'xs': '360px',
      // => @media (min-width: 320px) { ... }
      'screen-400': '400px',
      'screen-500': '500px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'ping-pong-breakpoint': '820px',
      // => @media (min-width: 820px) { ... }
      'screen-800': '800px',

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'tall': { 'raw': '(min-height: 500px)' },
    },
    extend: {},

  },
  plugins: [
    require('@sira-ui/tailwind')({
      //Color Pallette https://coolors.co/141414-14213d-fca311-e5e5e5
      // https://coolors.co/403f4c-2c2b3c-1b2432-121420-b76d68
      themes: [
        {
          name: 'Regal-Pallette',
          colorScheme: 'dark',
          prefersColorScheme: true,
          colors: {
            indieRed: '#B76D68',
            richBlack: '#121420',
            gunMetal: '#1B2432',
            raisinBlack: '#2C2B3C',
            onyx: '#403F4C',
            oxfordBlue: '#14213D',
            orangeWeb: '#FCA311',
            platinum: '#E5E5E5',
          },
        },
      ],
    }),
  ],
}

