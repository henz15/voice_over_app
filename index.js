const { execSync } = require("child_process");
const chokidar = require("chokidar");

const watcher = chokidar.watch("src, src/css/main.css, src/js/main.js", {
  persistent: true,
});

// Add event listeners.
watcher.on("change", (path) => {
  console.log(path, "Changed");
  execSync("npm run build:css");
  execSync("npm run build:js");
});

execSync("npm run build:css");
execSync("npm run build:js");
