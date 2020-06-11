<template>
  <div class="about">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->
    <vue-headful
      title="About Page"
      description="About page of the musci platform"
    />
    <!--CREAMOS LA PÁGINA ABOUT -->
    <!-- SE LE AÑADE MENU Y FOOTER -->

    <MenuCustom></MenuCustom>

    <h1>¡Hola!</h1>
    <img src="../image/emoji.gif" alt="emoji" />
    <p>
      Este proyecto ha sido creado por
      <a href="https://www.linkedin.com/in/susanafragasoporte/">Susana Fraga</a>
    </p>
    <p>
      Ultilizando la API de Last FM
      <a href="https://www.last.fm/api/account/create">API de Rick y Morty</a> ,
      la librería AXIOS, SweetAlert y VueHeadful.
    </p>
    <FooterCustom></FooterCustom>
  </div>
</template>
<script>
/* IMPORTAMOS COMPONENTES */
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";

/* LLAMAMOS A LOS COMPONENTES */
export default {
  name: "About",
  components: {
    MenuCustom,
    FooterCustom,
  },
};
</script>

<!--ESTILOS -->
<style scoped>
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}
.about {
  font-family: "Love Ya Like A Sister";
  text-align: center;
  background: linear-gradient(#ffff66, #e66465, #33ff33);
}
p {
  font-weight: bold;
}
</style>
