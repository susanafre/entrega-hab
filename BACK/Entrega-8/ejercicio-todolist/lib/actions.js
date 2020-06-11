// CREAMOS LAS FUNCIONES DE LO QUE SE VA A REALIZAR

//MÓDULOS REQUERIDOS
const path = require("path");
const fs = require("fs-extra");
const os = require("os");
const chalk = require("chalk");
const { formatDistance } = require("date-fns");
const { es, gl, en } = require("date-fns/locale");

require("dotenv").config();

//CREAMOS EL PATH A LA LISTA MEDIANTE UNA CONSTANTE
const todoFile = path.join(os.homedir(), process.env.TASKS_FILE);

let dateLocaleConfig;

//CONFIGURAMOS IDIOMA
switch (process.env.LANGUAGE) {
  case "gl":
    dateLocaleConfig = { locale: gl };
    break;
  case "en":
    dateLocaleConfig = { locale: en };
    break;
  default:
    dateLocaleConfig = { locale: es };
}

const listTitle = {
  en: "Todo list",
  es: "Lista de tareas",
  gl: "Lista de tarefas",
};

/* ### READTODOLIST ### */

//Devolver un objecto con la todoList guardada o si no hay un objecto inicial

async function readTodoList() {
  try {
    //Nos aseguramos que existe el archivo y si no existe, lo crea

    await fs.ensureFile(todoFile);

    //Indicamos que lea el fichero

    const currentTodos = await fs.readFile(todoFile, "utf-8");

    //Si hay listas, las devolverá en un JSON

    if (currentTodos) {
      return JSON.parse(currentTodos);
    }

    //Nos devuelve un array con las tareas

    return {
      tasks: [],
    };

    console.log("Current", currentTodos);

    // Si HAY ERROR
  } catch (error) {
    console.error(error);
  }
}

/* ### ADDTODO ### */

//Meter un todo al principio de la lista y guardarla
// Si añadimos priority, marcará la tarea como importante

async function addTodo({ text, priority }) {
  //Lee el fichero
  const currentTodos = await readTodoList();

  //La tarea nueva llevará un texto, al que se le añade la fecha de creación
  //En caso de que no indiquemos prioridad, será normal
  //Por defecto no estará realizada

  const newTask = {
    text,
    added: new Date(),
    priority: priority ? "high" : "normal",
    done: false,
  };

  // Se añadirá la tarea al array de tareas
  currentTodos.tasks = [newTask, ...currentTodos.tasks];

  //Guarda los todos
  await saveTodosToFile(currentTodos);
}

/* ### LIST TODOS ### */

//Listar todos los todos
async function listTodos() {
  //Lee los todos
  const currentTodos = await readTodoList();

  //Devuelve los todos en consola
  console.log();

  //El título de la lista de tareas aparecerá en azul
  console.log(chalk.blue(listTitle[process.env.LANGUAGE]));

  // A todas las tareas se les añadirá una marca de estado, si está completado o no
  //Se muestra la fecha en la que se han añadido
  for (const [index, task] of currentTodos.tasks.entries()) {
    const taskStatus = task.done ? "☑" : "☐";
    const taskHumanDate = formatDistance(
      new Date(task.added),
      new Date(),
      dateLocaleConfig
    );

    const taskText = task.done ? chalk.strikethrough(task.text) : task.text;
    const taskDisplay = chalk`   ${
      index + 1
    } - ${taskStatus} ${taskText} (añadida ${taskHumanDate})`;

    //Si la tarea tiene prioridad alta, aparecerá en rojo
    if (task.priority === "high") {
      console.log(chalk.red(taskDisplay));
    } else {
      //Si la tarea tiene una prioridad normal, apareceré en verde
      console.log(chalk.green(taskDisplay));
    }
  }

  console.log();
}

/* ### MARKASDONE ### */

//Marcar un todo como hecho y guardar la lista
async function markAsDone({ index }) {
  const currentTodos = await readTodoList();

  currentTodos.tasks[index - 1].done = true;

  await saveTodosToFile(currentTodos);
}

/* ### MARKASUNDONE */

//Marcar un todo como no hecho y guardar la lista
async function markAsUnDone({ index }) {
  const currentTodos = await readTodoList();

  currentTodos.tasks[index - 1].done = false;

  await saveTodosToFile(currentTodos);
}

/*  ### CLEANTODOS ### */

//Borrar los todos marcados como hechos
async function cleanTodos() {
  const currentTodos = await readTodoList();

  currentTodos.tasks = currentTodos.tasks.filter((task) => !task.done);

  await saveTodosToFile(currentTodos);
}

/* ### SAVETODOSTOFILE ### */

//Guardar la lista a disco
async function saveTodosToFile(taskList) {
  taskList.lastModified = new Date();

  await fs.outputJSON(todoFile, taskList, { spaces: 2 });
}

// EXPORTAMOS LAS FUNCIONES
module.exports = {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
};
