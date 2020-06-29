//IMPORTAMOS LOS MÓDULOS

import axios from "axios";
import jwt from "jwt-decode";

//CREAMOS CONSTANTES

const ENDPOINT = "http://localhost:3050";
const AUTH_TOKEN_KEY = "authToken";
const ROLE = "role";

//############# FUNCIÓN DE LOGIN ###########

export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/auth`, //URL DE LA AUTENTICACIÓN
        method: "POST", //MÉTODO DE LA AUTENTICACIÓN
        data: {
          email: email, //USUARIO
          password: password, //PASSWORD
          grant_type: "password",
        }, //DATOS DE LA AUTENTICACIÓN
      });
      setAuthToken(res.data.token);
      setIsAdmin(res.data.admin);

      resolve();
    } catch (err) {
      console.log("Error en login:", err);
      reject(err);
    }
  });
}

//GUARDAR TOKEN EN LOCALSTORAGE
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

//LOGOUT

export function clearLogin() {
  //le decimos que se vaciará
  axios.defaults.headers.common["Authorization"] = "";
  //Borrar token
  localStorage.removeItem(AUTH_TOKEN_KEY);
  clearAdmin();
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
  return !!authToken && !isTokenExpired(authToken); //fuerza al return a devolver un true o un false
}

// ########## FUNCIONES PARA COMPROBAR EL ROL DEL USUARIO #############

// GUARDAR SI ES ADMIN EN LOCALSTORAGE

export function setIsAdmin(admin) {
  localStorage.setItem(ROLE, admin);
}

//BORRAR ROL DEL USUARIO DEL LOCALSTORAGE

export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

// RECUPERAR EL ROL GUARDADO EN LOCALSTORAGE

export function getIsAdmin() {
  return localStorage.getItem(ROLE);
}

// COMPROBAR SI EL ROL ES TRUE O FALSE PARA DECLARAR SI ES ADMIN O NO

export function checkAdmin() {
  let role = false;
  let admin = getIsAdmin();
  if (admin === "true") {
    role = true;
  } else {
    role = false;
  }
  return role;
}
