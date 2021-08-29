module.exports = {
  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: ["react-scoped-styles/script-loader", "awesome-typescript-loader"],
      },
      // Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "react-scoped-styles/script-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },

      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "react-scoped-styles/style-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
