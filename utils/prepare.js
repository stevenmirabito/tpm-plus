var fs = require("fs-extra"),
    path = require("path");

// Clean the dist folder
fs.emptyDirSync(path.join(__dirname, "../build"));

require("./hmr-patch");
require("./generate_manifest");
require("./copy");
