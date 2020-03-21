module.exports = {
  sourceMaps: false,
  plugins: [["@babel/plugin-transform-runtime", {}]],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ]
};
