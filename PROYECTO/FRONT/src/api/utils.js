import axios from "axios";
import jwt from "jwt-decode";

//CREAMOS CONSTANTES

const ENDPOINT = "http://localhost:3000";

//SE USARÁ PARA GUARDA EN EL LOCALSTORAGE
const AUTH_TOKEN_KEY = "authorization";
const ID = "id";
const ROLE = "role";
const NAME = "name";
const PHOTO = "photo";

/////////// LOGIN CODERS ///////////////

export function loginCoders(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/coders/login`, //URL DE LA AUTENTICACIÓN
        method: "POST", //MÉTODO DE LA AUTENTICACIÓN
        data: {
          email: email, //USUARIO
          password: password, //PASSWORD
        }, //DATOS DE LA AUTENTICACIÓN
      });
      setAuthToken(res.data.data.token);
      getUserRole(res.data.data.role);
      getUserId(res.data.data.id);
      getUserName(res.data.data.name);
      getUserPhoto(res.data.data.photo);
      resolve();
    } catch (err) {
      if (err.response) {
        localStorage.setItem("error", err.response.data.message);
        console.log(err.response.data.message);
      }

      console.log("Error en Login", err);
    }
  });
}

///////////////////////LOGIN COMPANIES///////////////////

export function loginCompanies(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/companies/login`, //URL DE LA AUTENTICACIÓN
        method: "POST", //MÉTODO DE LA AUTENTICACIÓN
        data: {
          email: email, //USUARIO
          password: password, //PASSWORD
        }, //DATOS DE LA AUTENTICACIÓN
      });
      setAuthToken(res.data.data.token);
      getUserRole(res.data.data.role);
      getUserId(res.data.data.id);
      getUserName(res.data.data.name);
      getUserPhoto(res.data.data.photo);
      resolve();
    } catch (err) {
      if (err.response) {
        localStorage.setItem("error", err.response.data.message);
        console.log(err.response.data.message);
      }

      console.log("Error en Login", err);
    }
  });
}

//GUARDAR TOKEN EN LOCALSTORAGE
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //dentro de authtoken, guardado como auth_token_key, se guardará el token
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

//GUARDAR ROL EN LOCALSTORAGE

export function getUserRole(role) {
  return localStorage.setItem(ROLE, role);
}

//GUARDAR ID EN LOCALSTORAGE
export function getUserId(id) {
  return localStorage.setItem(ID, id);
}

//GUARDAR NAME EN LOCALSTORAGE
export function getUserName(name) {
  return localStorage.setItem(NAME, name);
}

//GUARDAR FOTO EN LOCALSTORAGE
export function getUserPhoto(photo) {
  return localStorage.setItem(PHOTO, photo);
}

//LOGOUT

export function clearLogin() {
  //le decimos que se vaciará
  axios.defaults.headers.common["Authorization"] = "";
  //Borrar token
  localStorage.removeItem(AUTH_TOKEN_KEY);
  clearRole();
  clearName();
  clearId();
  clearPhoto();
}

/* BORRAR ROL DEL USUARIO */
export function clearRole() {
  return localStorage.removeItem(ROLE);
}

/* BORRAR NOMBRE DEL USUARIO */
export function clearName() {
  return localStorage.removeItem(NAME);
}
/* BORRAR ID DEL USUARIO */
export function clearId() {
  return localStorage.removeItem(ID);
}

/* BORRAR FOTO DEL USUARIO */
export function clearPhoto() {
  return localStorage.removeItem(PHOTO);
}

//COGER EL TOKEN

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// COMPROBAR FECHA DEL TOKEN Y DEVOLVERLA

export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  //si no hay, no sigue
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

//COMPROBANDO SI LA FECHA SIGUE VIGENTE O NO

export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

// COMPROBAR SI EL USUARIO ESTÁ LOGUEADO O NO

export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken); //fuerza al resturn a devolver un true o un false
}

// RECUPERAR EL ROL GUARDADO EN LOCALSTORAGE

export function getRole() {
  return localStorage.getItem(ROLE);
}

/* COMPROBAR SI EL ROL ES ADMIN */
export function checkAdminRole() {
  if (localStorage.getItem(ROLE) === "admin") {
    return true;
  } else {
    return false;
  }
}

/* COMPROBAR SI EL ROL ES CODER */
export function checkCoderRole() {
  if (localStorage.getItem(ROLE) === "coder") {
    return true;
  } else {
    return false;
  }
}
/* COMPROBAR SI EL ROL ES COMPANY */

export function checkCompanyRole() {
  if (localStorage.getItem(ROLE) === "company") {
    return true;
  } else {
    return false;
  }
}
