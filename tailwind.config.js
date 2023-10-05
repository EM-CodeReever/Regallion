/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
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

