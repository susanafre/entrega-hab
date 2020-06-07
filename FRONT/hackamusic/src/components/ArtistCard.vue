<template>
  <div>
    <!-- CREAMOS V-FOR PARA LAS FICHAS DE LOS ARTISTAS -->
    <div class="card">
      <h1>⭐ TOP ARTISTS ⭐</h1>
      <ul>
        <li v-for="artist in artists" :key="artist.id">
          <h1>
            <p>NAME: {{ artist.name }}</p>
          </h1>
          <h2>
            <p>OYENTES: {{ artist.listeners }}</p>
          </h2>

          <p>
            <img :src="artist.image[2]['#text']" />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* INDICAMOS LAS PROPS */
export default {
  name: "ArtistCard",
  props: {
    artists: Array,
  },
};
</script>

<!-- ESTILOS -->
<style scoped>
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}
.card {
  font-family: "Love Ya Like A Sister";
  text-align: center;
  background: linear-gradient(#ffff66, #e66465, #3385ff, #33ff33, #ff33cc);
  padding-top: 2rem;
  padding-bottom: 1rem;
}
.card > h1 {
  background-color: rgb(51, 51, 53);
  padding: 1rem;
  color: #ffff66;
}
li {
  list-style: none;
  border: 3px dotted black;
  height: 400px;
  width: 450px;

  display: inline-block;
  margin: 1rem;
  background-color: lightgoldenrodyellow;
  opacity: 0.8;
}
p {
  font-weight: bold;
}
</style>

/* 1. Se crea la estructura básica 2 .Se añade el div dentro de template, scoped
y añadimos el name 3. Creamos el V-for para devolver los datos de la API 4.
Añadimos los estilos */
