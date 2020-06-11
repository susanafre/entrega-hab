<template>
  <div>
    <!-- CREAMOS V-FOR PARA LAS FICHAS DE LAS TRACKS -->
    <div class="track">
      <h1>⭐ TOP TRACKS ⭐</h1>
      <ul>
        <li v-for="track in tracks" :key="track.id">
          <h1>
            <p>NAME: {{ track.name }}</p>
          </h1>

          <p>DURATION: {{ track.duration }}</p>
          <p>LISTENERS: {{ track.listeners }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* INDICAMOS LAS PROPS */
export default {
  name: "TrackCard",
  props: {
    tracks: Array,
  },
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}
.track {
  font-family: "Love Ya Like A Sister";
  text-align: center;
  background: linear-gradient(#ffff66, #e66465, #3385ff, #33ff33, #ff33cc);
  padding-top: 2rem;
  padding-bottom: 1rem;
}
.track > h1 {
  background-color: rgb(51, 51, 53);
  padding: 1rem;
  color: #ffff66;
}
li {
  list-style: none;
  border: 3px dotted black;
  width: 40%;
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
