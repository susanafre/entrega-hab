<template>
  <div class="error">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="Error Page" description="Error page of the market" />

    <h1>💮 ERROR 404 💮</h1>
    <h2>PAGE NOT FOUND!</h2>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped>
@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}
.error {
  background-image: url("../assets/fondo.jpg");
  font-family: "dancing";
  height: 600px;
  text-align: center;
  color: #d098c5;
}
h1 {
  font-size: 3rem;
  background-color: white;
  width: 30%;
  margin: 0 auto;
}
h2 {
  font-size: 2rem;
  background-color: white;
  width: 30%;
  margin: 0 auto;
}
</style>
