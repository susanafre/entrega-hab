<template>
  <div>
    <p>{{ copyright }}</p>
  </div>
</template>

<script>
/* CREAMOS EL COPYRIGHT */
export default {
  name: "FooterCustom",
  data() {
    return {
      copyright: "Susana Fraga Rego, 2020 ",
    };
  },
};
</script>
/* ESTILOS */
<style scoped>
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}
div {
  background-color: rgb(51, 51, 53);
  height: 150px;
  padding-top: 1rem;
}
p {
  padding-top: 1rem;
  font-weight: bold;
  color: #ffff66;
  text-align: center;
  font-family: "Love Ya Like A Sister";
  font-size: 30px;
}
</style>

/* 1. Se crea la estructura básica 2 .Se añade el div dentro de template, scoped
y añadimos el name 3. Los componentes llevan siempre custom en el nombre 4.
Añadimos estilo al footer 5. Creamos la variable "copyright" que renderizamos en
el div */
