require('dotenv').config();

const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT;

// Controllers
const {
  listEntries,
  newEntry,
  getEntry,
  deleteEntry,
  editEntry,
  voteEntry,
  getEntryVotes
} = require('./controllers/diary');

const { register, login, info } = require('./controllers/users');
const { onlyAdmin, onlyUsers } = require('./controllers/protected');
const { userAuthenticated, userIsAdmin } = require('./middlewares/auth');

// Console logger middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());

// Multipart parsing middleware
app.use(fileUpload());

// CORS middleware
app.use(cors());

// Serve static
app.use(express.static(path.join(__dirname, 'static')));

// Routes

app.post('/users', register);
app.post('/users/login', login);
app.get('/users/:id', userAuthenticated, info);

app.get('/entries', listEntries);
app.post('/entries', userAuthenticated, onlyUsers, newEntry);

app.get('/entries/:id', getEntry);
app.get('/entries/:id/votes', getEntryVotes);
app.post('/entries/:id/votes', userAuthenticated, onlyUsers, voteEntry);
app.put('/entries/:id', userAuthenticated, userIsAdmin, onlyAdmin, editEntry);
app.delete(
  '/entries/:id',
  userAuthenticated,
  userIsAdmin,
  onlyAdmin,
  deleteEntry
);

// Error middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpCode || 500).send({
    status: 'error',
    message: error.message
  });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 🚀`);
});
