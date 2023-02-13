const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} = require("@module-federation/node");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
      "./Router": "./src/Router",
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
      name: "remote1",
      filename: "remoteEntry.js",
      library: { type: "commonjs-module" },
      remotes: {
        remote2: "remote2@http://localhost:3002/server/remoteEntry.js",
      },
      exposes: {
        "./Router": "./src/Router",
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
      name: "remote1",
      library: { type: "commonjs-module" },
      remotes: {
        remote2: "remote2@http://localhost:3002/server/remoteEntry.js",
      },
    }),
  ],
};
