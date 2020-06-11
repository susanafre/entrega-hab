//MÓDULOS REQUERIDOS

const minimist = require("minimist");
const chalk = require("chalk");

// EXPORTAMOS LOS MÉTODOS DE ACTIONS
const {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
} = require("./lib/actions");

//PROCESAMOS LOS ARGUMENTOS QUE VENDRÁN POR CONSOLA CON MINISMIST
const { _, priority, list, done, undone, clean } = minimist(
  process.argv.slice(2)
);

//Procesamos arguments

//SI AÑADIMOS CLEAN, SE LIMPIARÁ LA LISTA

if (clean) {
  cleanTodos().then(() => {
    console.log(chalk.green(`Lista de tareas limpia`));
    process.exit();
  });
}

// SI AÑADIMOS LIST, LISTARÁ TODOS LOS TODOS
if (list) {
  listTodos().then(() => {
    process.exit();
  });
}

// MARCAMOS UNA TAREA COMO HECHA
if (done) {
  markAsDone({ index: done }).then(() => {
    console.log(chalk.green("Tarea marcada como hecha correctamente."));
    process.exit();
  });
}

//MARCAMOS UNA TAREA COMO NO REALIZADA
if (undone) {
  markAsUnDone({ index: undone }).then(() => {
    console.log(chalk.green("Tarea marcada como no hecha correctamente."));

    process.exit();
  });
}

const todoText = _.join(" ");

if (todoText) {
  addTodo({
    text: todoText,
    priority,
  }).then(() => {
    console.log(chalk.green("Tarea añadida correctamente."));
    process.exit();
  });
}
