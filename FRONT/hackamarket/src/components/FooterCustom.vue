<template>
  <!-- CREAMOS UN CONTENEDOR -->
  <div class="footer">
    <div class="text">
      <h1>SUSANA FRAGA REGO</h1>
      <h2>HACKAMARKET</h2>
    </div>
  </div>
</template>

<script>
/* EXPORTAMOS EL COMPONENTE */
export default {
  name: "FooterCustom",
};
</script>

<style scoped>
/* ### ESTILOS ### */
@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}
.footer {
  font-family: "dancing";
  background-color: #d098c5;
  padding: 0;
  margin: 0;
}
.text {
  padding: 1rem;
  color: #f7f1f6;
  text-align: center;
}
</style>
