const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('tailwindcss')(),
    require('postcss-preset-env')({
      // Full list of features: https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
      features: {
        'nesting-rules': true,
      },
    }),

    !dev &&
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.svelte', './src/**/*.html'],
        defaultExtractor: (content) =>
          [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
            ([_match, group, ..._rest]) => group
          ),
      }),

    // Minify if prod
    !dev &&
      require('cssnano')({
        preset: ['default', { discardComments: { removeAll: true } }],
      }),
  ],
};
