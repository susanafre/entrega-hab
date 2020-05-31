// INDICANDO EL USO DE AXIOS PARA LA API

const axios = require("axios").default;

//Base URL de la API
const apiUrl = "https://rickandmortyapi.com/api";

//Función para coger todos los chars
function getAll() {
  return axios.get(`${apiUrl}/character`);
}
//Función para coger sólo el id de los chars
function getChar(id) {
  return axios.get(`${apiUrl}/character` + id);
}

export default {
  getAll,
  getChar,
};
