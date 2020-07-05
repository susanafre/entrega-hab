<template>
  <div class="candidatures">
    <vue-headful title="Ver candidaturas" description="You can see your candidatures" />

    <!-- COMPONENTE MENÚ -->

    <MenuLoggedCoder :username="username" v-on:logout="logoutUser"></MenuLoggedCoder>
    <div class="explanation">
      <p>* Aquí puedes ver tus candidaturas, el estado de las mismas o eliminarlas*</p>
    </div>
    <h1 class="candidaturavacia" v-show="emptyCandidature">No tienes ninguna candidatura</h1>

    <!-- COMPONENTE PARA VER LAS CANDIDATURAS -->

    <CandidaturesCard :candidatures="candidatures" v-on:borrar="deleteCandidatures"></CandidaturesCard>

    <!-- COMPONENTE PARA FOOTER -->

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */
/* Componente de Footer */
import FooterCustom from "@/components/FooterCustom.vue";
import CandidaturesCard from "@/components/CandidaturesCard.vue";
import MenuLoggedCoder from "../../components/menus/MenuLoggedCoder.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "@/api/utils";

export default {
  name: "CandidaturesCoder",
  components: {
    CandidaturesCard,
    MenuLoggedCoder,
    FooterCustom
  },
  data() {
    return {
      /* Array candidatures */
      candidatures: [],
      /* Variables para Id e ID1 */
      id: "",
      id1: null,
      /* Variable para obtener el nombre de usuario */
      username: "",
      emptyCandidature: true
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */

    /* Ver candidaturas */
    viewCandidatures() {
      if (localStorage.id) this.id = localStorage.id;
      axios
        .get("http://localhost:3000/coders/candidatures/" + this.id, {
          id: this.id
        })
        .then(response => {
          this.candidatures = response.data.data;

          console.log("Esto es response.data.data", response.data.data);
          console.log("esto es candidatures:", this.candidatures);

          if (this.candidatures) this.emptyCandidature = false;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Eliminar candidatura */

    deleteCandidatures(data) {
      console.log("Esto es data", data);
      this.id1 = data.PK_candidature;
      axios
        .delete("http://localhost:3000/coders/candidatures/" + this.id1, {
          id1: this.id1
        })

        .then(async function(response) {
          await Swal.fire("Se ha borrado la candidatura");
          location.reload();
        })

        .catch(function(error) {
          console.log(error);
        });
    },

    /* #### FUNCIONES "AUXILIARES" #### */

    /* Desloguearse */
    logoutUser() {
      return clearLogin(location.reload());
    }
  },
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  },
  created() {
    this.viewCandidatures();
  }
};
</script>

<style scoped>
@font-face {
  font-family: "serif";
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
.candidatures {
  font-family: "sansSerif";
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #dae1e7;
  min-height: 700px;
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  border-bottom: 1px solid #dae1e7;
  opacity: 0.8;
}
h1 {
  font-family: "serif";
  padding: 1rem;
  text-decoration: underline;
}
.candidaturavacia {
  margin-top: 15rem;
  height: 500px;
  text-decoration: underline;
}
</style>