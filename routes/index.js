const path = require("path");
const apiRoutes = require("./api");

// If no API routes are hit, send the React app
const routes = app => {
  // API Routes
  app.use("/api", apiRoutes);

  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
};

module.exports = routes;
