const minimist = require("minimist");
const fs = require("fs-extra");
const date = require("date-fns");
const path = require("path");
const chalk = require("chalk");

const {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
} = require("./lib/actions");

const { _, priority, list, done, undone, clean } = minimist(
  process.argv.slice(2)
);

//Procesamos arguments
if (clean) {
  cleanTodos();
  process.exit();
}

if (list) {
  listTodos();
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

addTodo({
  text: _.join(" "),
  priority,
});
