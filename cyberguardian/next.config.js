// next.config.js

module.exports = {
  webpack: (config, { isServer, dev }) => {
    // Disable HMR for production builds
    if (!dev && !isServer) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== "HotModuleReplacementPlugin"
      );
    }

    return config;
  },
};

/**
    dev indicates whether the current build is for development or production.
    It's true for development builds and false for production builds.
 
    isServer indicates whether the webpack configuration is for the server-side bundle (true)
    or the client-side bundle (false).

    With this modification, HMR will be enabled (HotModuleReplacementPlugin will be included)
    only for development builds (dev === true) and disabled for production builds (dev === false).
    Additionally, it will be disabled for server-side bundles (isServer === true)
    regardless of the environment.
 */
