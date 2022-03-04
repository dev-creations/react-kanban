module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    [
      '@babel/preset-env',
      {
        exclude: ['transform-regenerator'],
      },
    ],
    ['@babel/typescript'],
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  env: {
    // only include babel istanbul plugin when Cypress runs
    // because Jest preset already includes it, and you will
    // get duplicate plugin error
    cypress: {
      plugins: ['istanbul'],
    },
    production: {
      plugins: ['react-remove-properties'],
    },
  },
};
