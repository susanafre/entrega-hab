<template>
  <div class="projects">
    <!-- IMPORTAMOS COMPONENTE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <!-- IMPORTAMOS COMPONENTE PARA VER LOS PROYECTOS -->
    <AdminProjectsCard :projects="projects"></AdminProjectsCard>

    <!-- IMPORTAMOS COMPONENTE PARA VER EL FOOTER -->
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
import AdminProjectsCard from "@/components/AdminProjectsCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewprojects",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminProjectsCard
  },
  data() {
    return {
      projects: [],
      username: ""
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */
    /* Ver perfil coder */
    getCoders() {
      axios
        .get("http://localhost:3000/all/projects")

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.projects = response.data.data;
          console.log("Esto es projects:", this.projects);
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
    this.getCoders();
  },
  /* MOUNTED */
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  }
};
</script>

<style scoped>
</style>