<template>
  <div class="companies">
    <!-- IMPORTAMOS COMPONENTE DE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <!-- IMPORTAMOS COMPONENTE QUE NOS MUESTRA LAS CANDIDATURAS -->
    <AdminCandidaturesCard :candidatures="candidatures"></AdminCandidaturesCard>

    <!-- IMPORTAMOS COMPONENTE DE FOOTER -->
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */
import MenuLoggedAdmin from "@/components/MenuLoggedAdmin.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import AdminCandidaturesCard from "@/components/AdminCandidaturesCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewCandidatures",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminCandidaturesCard
  },
  data() {
    return {
      candidatures: [],
      username: ""
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */
    /* Ver perfil coder */
    getCandidatures() {
      axios
        .get("http://localhost:3000/all/candidatures")

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.candidatures = response.data.data;
          console.log("Esto es candidatures:", this.candidatures);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    /* FUNCIÓN QUE DESLOGUEA AL USUARIO */

    logoutUser() {
      return clearLogin(location.reload());
    }
  },
  created() {
    this.getCandidatures();
  },
  /* MOUNTED */
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  }
};
</script>

<style scoped>
</style>