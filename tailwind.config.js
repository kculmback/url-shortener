const defaults = require('tailwindcss/stubs/defaultConfig.stub');

module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.html'],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: [
      ...defaults.variants.backgroundColor,
      'dark',
      'dark-hover',
    ],
    borderColor: [...defaults.variants.borderColor, 'dark'],
    textColor: [...defaults.variants.textColor, 'dark', 'dark-hover'],
  },
  plugins: [require('tailwindcss-dark-mode')()],
};
