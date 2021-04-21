const fs = require("fs").promises;
const path = require("path");

async function main() {
  const filenames = await fs.readdir(path.join(__dirname, "typeDefs"), "utf8");
  const filesPromise = filenames.map((filename) => {
    return fs.readFile(path.join(__dirname, `typeDefs/${filename}`), "utf8");
  });
  const response = await Promise.all(filesPromise);

  console.log(response);
}
main();
