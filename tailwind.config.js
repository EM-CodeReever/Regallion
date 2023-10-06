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
      'tall': { 'raw': '(min-height: 760px)' },
    },
    extend: {},

  },
  plugins: [
    require('@sira-ui/tailwind')({
      // excludedThemes: ['light'],
      themes: [
        {
          name: 'custom',
          colorScheme: 'dark',
          prefersColorScheme: true,
          colors: {
            sunsetRed:'#FA7268',
            sunsetOrange:'#C62368',
            sunsetFire: '#d91607',
            grapePurple: '#8c07d9',
            blankWhite: '#fffff6',
          },
        },
      ],
    }),
  ],
}

