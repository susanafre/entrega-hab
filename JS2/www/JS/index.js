async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

//hace un fetch a la url y nos devuelve un json
