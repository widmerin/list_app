// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "The List",
  plugins: [
    {
      use: "gridsome-plugin-pwa",
      options: {
        startUrl: "/",
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "manifest.json",
        disableServiceWorker: true,
        shortName: "The List",
        themeColor: "#666600",
        backgroundColor: "#48426d",
        icon: "src/favicon.png", // must be provided like 'src/favicon.png'
        msTileImage: "",
        msTileColor: "#666600",
        gcmSenderId: undefined,
        svgFavicon: 'src/favicon.svg',          // Optional. Requires favicon.ico fallback
        appleMaskIcon: 'src/favicon.svg',       // Optional
      },
    },
  ],
};
