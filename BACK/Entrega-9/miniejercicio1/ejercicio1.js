//MÓDULOS REQUERIDOS

const fs = require("fs").promises;
const path = require("path");

//Lee Fichero
async function readFile(inputFile) {
  try {
    const file = path.resolve(__dirname, inputFile);
    const info = await fs.stat(file);

    if (info.size < 10000) {
      const content = await fs.readFile(file);

      //Si el fichero pesa más de 10 KB no lo leerá y devolverá error
      console.log(content.toString());
    } else {
      console.log("El archivo es más grande de 10 KB");
    }
  } catch (error) {
    console.error(error);
  }
}

readFile(process.argv[2]);
