<template>
  <div class="tracks">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->
    <vue-headful
      title="Top Tracks Page"
      description="Top Tracks page of the musci platform"
    />
    <!-- CREAMOS LA PÁGINA USANDO LOS COMPONENTES -->

    <!-- MENU -->
    <MenuCustom></MenuCustom>
    <!-- COMPONENTES TRACKCARD -->
    <TrackCard :tracks="tracks"></TrackCard>
    <!-- FOOTER -->
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS LOS COMPONENTES */
import api from "@/api/index.js";
import TrackCard from "@/components/TrackCard.vue";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";

/* AÑADIMOS LOS COMPONENTES */
export default {
  name: "TopTracks",
  components: {
    TrackCard,
    MenuCustom,
    FooterCustom,
  },
  data() {
    return {
      tracks: [],
    };
  },
  created() {
    api
      .getTopTracks()
      .then((response) => (this.tracks = response.data.tracks.track));
  },
};
</script>

<style></style>
