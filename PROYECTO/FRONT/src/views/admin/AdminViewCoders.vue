<template>
  <div class="coders">
    <vue-headful title="Ver Coders" description="You can see coders" />
    <!-- IMPORTAMOS COMPONENTE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <!-- IMPORTAMOS COMPONENTE PARA VER LOS CODERS -->
    <AdminCodersCard :coders="coders" v-on:activar="activateAccount"></AdminCodersCard>

    <!-- IMPORTAMOS FOOTER -->
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */
import MenuLoggedAdmin from "../../components/menus/MenuLoggedAdmin.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import AdminCodersCard from "@/components/AdminCodersCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewCoders",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminCodersCard
  },
  data() {
    return {
      coders: [],
      username: "",
      id: null
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */
    /* Ver perfil coder */
    getCoders() {
      axios
        .get("http://localhost:3000/all/coders")

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.coders = response.data.data;

          console.log("Esto es coders:", this.coders);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    activateAccount(data) {
      this.id = data.PK_coder;
      axios
        .put("http://localhost:3000/account/coder/" + this.id, {
          id: this.id
        })
        .then(async function(response) {
          await Swal.fire("Se ha activado la cuenta de este usuario");
          location.reload();
        })
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