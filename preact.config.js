import path from "path";

export default {
  webpack(config) {
    config.module.rules[4].include = [
      path.resolve(__dirname, "src", "pages"),
      path.resolve(__dirname, "src", "components"),
      path.resolve(__dirname, "src", "sections"),
    ];

    config.module.rules[5].exclude = [
      path.resolve(__dirname, "src", "pages"),
      path.resolve(__dirname, "src", "components"),
      path.resolve(__dirname, "src", "sections"),
    ];
  },
};
