<template>
  <div class="error">
    <vue-headful title="Paǵina de error" description="Página de error" />
    <h1>ERROR 404</h1>
    <h2>Page not found</h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@font-face {
  font-family: "serif";
  src: url("../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../assets/Ubuntu-Regular.ttf");
}
.error {
  font-family: "sansSerif";
  background-image: url("https://images.unsplash.com/photo-1510511498717-4326639c999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  opacity: 0.9;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  /*  background: rgba(0, 0, 0, 0.5); */
  width: 100%;
}
h1 {
  font-family: "serif";
  color: #dae1e7;
  font-size: 5rem;
  margin-top: 23rem;
}
h2 {
  color: #dae1e7;
  font-size: 4rem;
}
</style>