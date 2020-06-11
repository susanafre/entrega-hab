<template>
  <div class="about">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->
    <vue-headful title="About Page" description="About page of the musci platform" />
    <!--CREAMOS LA PÁGINA ABOUT -->
    <!-- SE LE AÑADE MENU Y FOOTER -->

    <MenuCustom></MenuCustom>

    <h1>¡Hola!</h1>
    <img src="../assets/emoji.gif" alt="emoji" />
    <p>
      Este proyecto ha sido creado por
      <a
        href="https://www.linkedin.com/in/susanafragasoporte/"
      >Susana Fraga</a>
    </p>
    <p>
      Ultilizando la
      <a href="https://www.last.fm/api/account/create">API de Last FM</a> ,
      <a href="https://www.npmjs.com/package/axios">la librería AXIOS,</a>
      <a href="https://sweetalert2.github.io/">SweetAlert</a> y
      <a href="https://www.npmjs.com/package/vue-headful">VueHeadful.</a>
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
    FooterCustom
  }
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
