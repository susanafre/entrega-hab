<template>
  <div>
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="Home Page" description="Home page of the musci platform" />

    <!-- AÑADIMOS LOS COMPONENTES AL HTML -->

    <!-- MENÚ -->

    <MenuCustom></MenuCustom>

    <div class="introduction">
      <h1>Bienvenid@ a HACK A MUSIC!</h1>

      <h2>Aquí podrás encontrar a los artistas más TOP 👇</h2>
      <!-- añadimos el componente del botón para subscribirse -->
      <ButtonCustom v-on:subscribeButton="subscribeButton()"></ButtonCustom>
    </div>

    <!-- MENUTOPS -->

    <MenuTops></MenuTops>

    <!-- TAGSCARD -->

    <TagsCard :tags="tags"></TagsCard>

    <!-- FOOTER -->

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS LOS COMPONENTES */

import api from "@/api/index.js";
import TagsCard from "@/components/TagsCard.vue";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";

import ButtonCustom from "@/components/ButtonCustom.vue";
//Llamamos a SWAL
import Swal from "sweetalert2";
/* AÑADIMOS LOS COMPONENTES */

export default {
  name: "Home",
  components: {
    TagsCard,
    MenuCustom,
    FooterCustom,

    ButtonCustom
  },
  data() {
    return {
      tags: []
    };
  },
  created() {
    api.getTopTags().then(response => (this.tags = response.data.tags.tag));
  },
  methods: {
    subscribeButton() {
      Swal.fire({
        title: "Subscríbete a nuestra newsletter! 👇 ",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Subscribirme!",
        showLoaderOnConfirm: true,
        preConfirm: login => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if (result.value) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          });
        }
      });
    }
  }
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}

.introduction {
  background: linear-gradient(#ffff66, #e66465);
  text-align: center;
  padding: 3rem;
  font-family: "Love Ya Like A Sister";
  margin: 0;
}
</style>
