<template>
  <div>
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->
    <vue-headful title="Error Page" description="Error Page" />
    <!-- CREAMOS LA PÁGINA ERROR -->
    <div class="error">
      <h1>ERROR 404</h1>
      <p>PAGE NOT FOUND!!</p>
      <p>😱</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}
div {
  font-family: "Love Ya Like A Sister";
  text-align: center;
  background: linear-gradient(#ffff66, #e66465, #33ff33);
  width: 100%;
  height: 900px;
  display: table;
}
.error {
  display: table-cell;
  vertical-align: middle;
}
h1 {
  font-size: 150px;
  -webkit-text-stroke: 2px black;
  color: transparent;
}
p {
  font-weight: bold;
  font-size: 80px;
  -webkit-text-stroke: 2px black;
  color: transparent;
}
</style>
