const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} = require("@module-federation/node");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
      "./Index": "./src/routing/MemoryRouter",
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: deps["react-dom"],
      },
    },
  }),
  server: [
    new NodeFederationPlugin({
      name: "remote2",
      filename: "remoteEntry.js",
      library: { type: "commonjs-module" },
      exposes: {
        "./Index": "./src/routing/MemoryRouter",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new StreamingTargetPlugin({
      name: "remote2",
      library: { type: "commonjs-module" },
    }),
  ],
};
