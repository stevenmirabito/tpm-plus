var manifest = require("../src/manifest.json"),
    fs = require("fs"),
    path = require("path"),
    env = require("./env");

// Generates an extension manifest using the information from package.json
manifest.version = process.env.npm_package_version;
manifest.description = process.env.npm_package_description;
manifest.author = process.env.npm_package_author;

fs.writeFileSync(
  path.join(__dirname, "../build/manifest.json"),
  JSON.stringify(manifest)
);
