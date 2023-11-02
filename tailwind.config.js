/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'ping-pong-breakpoint': '820px',
      // => @media (min-width: 820px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'tall': { 'raw': '(min-height: 500px)' },
    },
    // colors: {
    //   night: '#141414',
    //   oxfordBlue: '#14213D',
    //   orangeWeb: '#FCA311',
    //   platinum: '#E5E5E5',
    // },
    extend: {},

  },
  plugins: [
    require('@sira-ui/tailwind')({
      //Color Pallette https://coolors.co/141414-14213d-fca311-e5e5e5
      themes: [
        {
          name: 'Regal-Pallette',
          colorScheme: 'dark',
          prefersColorScheme: true,
          colors: {
            night: '#141414',
            oxfordBlue: '#14213D',
            orangeWeb: '#FCA311',
            platinum: '#E5E5E5',
          },
        },
      ],
    }),
  ],
}

