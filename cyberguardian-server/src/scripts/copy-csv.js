const fs = require("fs-extra");
const path = require("path");

const srcPath = path.resolve(__dirname, "../services/cybertools.csv"); // Adjust the path accordingly
const distPath = path.resolve(__dirname, "../../dist/cybertools.csv"); // Adjust the path accordingly

fs.copyFile(srcPath, distPath, (err) => {
  if (err) {
    console.error("Error copying CSV file:", err);
  } else {
    console.log("CSV file copied to dist directory");
  }
});
