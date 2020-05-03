/* node todo.js Comprar pan //Añadiria "comprar pan" al principio de la lista de tareas
node todo.js Ir al dentista --priority //Añadiria con prioridad alta
node todo.js --list //Listaría todas las tareas
node todo.js --done=1 //Marcaría la tarea 1 como hecha
node todo.js --undone=1 //Desmarcaría la tarea 1 como hecha
node todo.js --clean //Borraria las tareas ya hechas

//Cada tarea debe guardar el texto de la tarea, el estado y fecha añadida
//Cuando se listen debe mostrar toda esa información

//La lista de tareas debe guardarse en un archivo .tasks.json en el directorio personal del usuario.

Modules:
//minimist
//fs-extra
//date-fns

//PARA NOTA:
//La aplicación debería leer un archivo .env que tuviera una variable de entorno LANG=es/gl
//en base a esa variable mostrar los textos de la aplicación
 */

const minimist = require("minimist");
const fs = require("fs-extra");
const date = require("date-fns");
const path = require("path");
const chalk = require("chalk");

async function addTodo({ text, priority }) {
  try {
    const date = new Date();
    if (!priority) {
      priority = false;
    }

    const listatarea = require("./tasks");

    listatarea.push({ text, priority, date });

    fs.writeJSON(".tasks.json", JSON.stringify(listatarea), (err) => {
      if (err) throw err;

      console.log("Done writing"); // Success
    });

    const lista = await fs.readJson(".tasks.json");

    console.log(lista);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("El fichero no está creado, se va a crear");
    } else {
      console.error(error);
    }
  }
}

const { _, priority, list, done, undone, clean } = minimist(
  process.argv.slice(2)
);

//Procesamos argumentos
if (clean) {
  cleanTodos();
  process.exit();
}

if (done) {
  markAsDone({ index: done });
  process.exit();
}

if (undone) {
  markAsUnDone({ index: undone });
  process.exit();
}

if (list) {
  listTodos();
  process.exit();
}

addTodo({
  text: _.join(" "),
  priority,
});
