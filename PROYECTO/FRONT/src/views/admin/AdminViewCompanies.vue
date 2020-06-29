<template>
  <div class="companies">
    <!-- IMPORTAMOS COMPONENTE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <!-- IMPORTAMOS COMPONENTE PARA VER LAS EMPRESAS -->
    <AdminCompaniesCard :companies="companies" v-on:activar="activateAccount"></AdminCompaniesCard>

    <!-- IMPORTAMOS COMPONENTE FOOTER -->
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
import AdminCompaniesCard from "@/components/AdminCompaniesCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewCompanies",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminCompaniesCard
  },
  data() {
    return {
      companies: [],
      username: "",
      id: null
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */
    /* Ver perfil coder */
    getCoders() {
      axios
        .get("http://localhost:3000/all/companies")

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.companies = response.data.data;
          console.log("Esto es companies:", this.companies);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    /* FUNCIÓN PARA ACTIVAR CUENTA */
    activateAccount(data) {
      this.id = data.PK_company;
      axios
        .put("http://localhost:3000/account/company/" + this.id, {
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