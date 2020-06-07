<template>
  <div class="artist">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->
    <vue-headful
      title="Top Artists Page"
      description="Top Artists page of the musci platform"
    />

    <!-- AÑADIMOS LOS COMPONENTES EN EL HTML -->

    <!-- MENÚ -->
    <MenuCustom></MenuCustom>

    <h1>Aquí podrás encontrar toda la información sobre los Top Artists 👇</h1>

    <!-- ARTIST CARD -->

    <ArtistCard :artists="artists"></ArtistCard>

    <!-- FOOTER -->

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS COMPONENTES */
import api from "@/api/index.js";
import ArtistCard from "@/components/ArtistCard.vue";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";

/* AÑADIMOS COMPONENTES */
export default {
  name: "TopArtists",
  components: {
    ArtistCard,
    MenuCustom,
    FooterCustom,
  },
  data() {
    return {
      artists: [],
    };
  },
  created() {
    api
      .getArtists()
      .then((response) => (this.artists = response.data.topartists.artist));
  },
};
</script>

<style scoped>
/* ESTILOS */

@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}

h1 {
  text-align: center;
  padding: 4rem;
  font-family: "Love Ya Like A Sister";
  background-color: #ffff66;
  margin: 0;
}
</style>
