<template>
  <div>
    <!-- CREAMOS V-FOR PARA LAS FICHAS DE LOS TAGS -->
    <div class="tag">
      <ul>
        <li v-for="tag in tags" :key="tag.id">
          <h1>
            <p>NAME: {{ tag.name }}</p>
          </h1>

          <p>TAGS: {{ tag.taggings }}</p>
          <p>REACH: {{ tag.reach }}</p>
          <p>URL: {{ tag.url }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* INDICAMOS LAS PROPS */
export default {
  name: "TagsCard",
  props: {
    tags: Array,
  },
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}

.tag {
  text-align: center;
  font-family: "Love Ya Like A Sister";
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: linear-gradient(#ffff66, #e66465, #3385ff, #33ff33, #ff33cc);
}
li {
  border: 3px dotted black;

  list-style: none;
  width: 400px;
  height: 175px;
  margin: 1rem;

  display: inline-block;
  padding: 2rem;
  background-color: lightgoldenrodyellow;
  opacity: 0.7;
}
p {
  font-weight: bold;
}
</style>

/* 1. Se crea la estructura básica 2 .Se añade el div dentro de template, scoped
y añadimos el name 3. Creamos el V-for para devolver los datos de la API 4.
Añadimos los estilos */
