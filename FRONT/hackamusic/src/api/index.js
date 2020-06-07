import config from "./config.js";

/* IMPORTAMOS AXIOS Y LA API KEY */
const axios = require("axios").default;
const apiKey = config.apiKey;

/* CREAMOS LA BASE DE LA URL A LA API */
const BASE_URL = "https://ws.audioscrobbler.com/";

/* CREAMOS VARIABLES PARA LAS URLS QUE SE USARÁN EN LAS DIFERENTES FUNCIONES */
const URL_GEO =
  "2.0/?method=geo.gettopartists&country=spain&api_key=" +
  apiKey +
  "&format=json";

const URL_TOP_TRACK =
  "2.0/?method=geo.gettoptracks&country=spain&api_key=" +
  apiKey +
  "&format=json";

const URL_TOP_TAG =
  "2.0/?method=chart.gettoptags&api_key=" + apiKey + "&format=json";

/* FUNCIÓN GETARTISTS */
async function getArtists() {
  try {
    const response = await axios.get(`${BASE_URL}${URL_GEO}`);
    return response;
  } catch (error) {
    //handle error
    console.error(error);
  }
}

/* FUNCTION GETTOPTRACKS */
async function getTopTracks() {
  try {
    const response = await axios.get(`${BASE_URL}${URL_TOP_TRACK}`);
    return response;
  } catch (error) {
    //handle error
    console.error(error);
  }
}

/* FUNCIÓN GETTOPTAGS */
async function getTopTags() {
  try {
    const response = await axios.get(`${BASE_URL}${URL_TOP_TAG}`);
    return response;
  } catch (error) {
    //handle error
    console.error(error);
  }
}

/* EXPORTAMOS LAS FUNCIONES */
export default {
  getArtists,
  getTopTracks,
  getTopTags,
};

/* 
1. Importamos la configuración de archivo config
2. Definimos la constante apiKey donde se guardará la apiKey
3. Guardamos en una constante la URL a la API 
4. Importamos la librería Axios
5. Creamos una función para coger los top artists de España
6. Exportamos la función
7. Hacemos lo mismo para coger los top tracks y top tags*/
