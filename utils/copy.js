var fs = require("fs-extra"),
    path = require("path"),
    manifest = require(path.join(__dirname, "../src/manifest.json"));

// Copy icons
for (var icon in manifest.icons) {
  if (manifest.icons.hasOwnProperty(icon)) {
    fs.copySync(
      path.join(__dirname, "../src", manifest.icons[icon]),
      path.join(__dirname, "../build", manifest.icons[icon])
    );
  }
}
