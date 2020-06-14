<template>
  <div class="aboutpage">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="About Page" description="About page of the market" />

    <!-- IMPORTAMOS EL MENÚ -->

    <MenuCustom v-on:deslogarse="logoutUser"></MenuCustom>

    <!-- IMPORTAMOS ABOUTCARD -->

    <AboutCard></AboutCard>

    <!-- IMPORTAMOS EL FOOTER -->

    <FooterCustom></FooterCustom>
  </div>
</template>


<script>
/* IMPORTAMOS LOS MÓDULOS REQUERIDOS, FUNCIONES Y COMPONENTES */

import axios from "axios";
import { clearLogin } from "../api/utils";

import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import AboutCard from "@/components/AboutCard.vue";

/* EXPORTAMOS */

export default {
  name: "Productos",

  components: {
    MenuCustom,
    FooterCustom,
    AboutCard
  },

  /* MÉTODOS */

  methods: {
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    }
  }
};
</script>
<style scoped>
/* ESTILOS */
/* EXPORTAMOS FUENTE */
@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}

/* DIV PRINCIPAL */

.aboutpage {
  font-family: "dancing";
  color: #d098c5;
  background-image: url("../assets/fondo.jpg");
}
h1 {
  color: greenyellow;
  background-color: black;
}
</style>
