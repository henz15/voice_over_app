const { execSync, exec } = require("child_process");

execSync("npm run build:css");
exec("npm run build:js");
