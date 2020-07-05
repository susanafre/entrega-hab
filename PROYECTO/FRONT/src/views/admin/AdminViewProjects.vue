<template>
  <div class="projects">
    <vue-headful title="Ver Proyectos" description="You can see all projects" />
    <!-- IMPORTAMOS COMPONENTE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:cambiar="changeLocation" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <div class="explanation">
      <p>* Aquí puedes ver proyectos, editarlos, eliminarlos o ver sus candidaturas. *</p>
    </div>

    <!-- IMPORTAMOS COMPONENTE PARA VER LOS PROYECTOS -->
    <AdminProjectsCard
      :projects="projects"
      v-on:editar="editProject"
      v-on:eliminar="deleteProject"
      v-on:mostrar="showCandidatures"
    ></AdminProjectsCard>

    <AdminCandidaturesCard
      :candidatures="candidatures"
      :modalCandidature="modalCandidature"
      v-on:cerrarModal="closeModalCandidatures"
    ></AdminCandidaturesCard>

    <!-- MODAL PARA EDITAR LOS PROYECTOS -->

    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h1>EDITAR PROYECTO</h1>

        <p>
          <label for="name">NOMBRE:</label>
          <input class="namemain" v-model="newName" placeholder="Nombre" />
        </p>

        <p>
          <label class="description" for="description">DESCRIPCIÓN:</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            v-model="newDescription"
            placeholder="Descripción"
          ></textarea>
        </p>

        <p>
          <label for="province">PROVINCIA:</label>
          <input v-model="newProvince" placeholder="Provincia" />
        </p>

        <p>
          <label for="language">LENGUAJE:</label>
          <input v-model="NewLanguage" placeholder="Lenguaje" />
        </p>

        <p>
          <label for="technology">TECNOLOGÍA:</label>
          <input v-model="newTechnology" placeholder="Tecnología" />
        </p>

        <p>
          <label for="architecture">ARQUITECTURA:</label>
          <input v-model="newArchitecture" placeholder="Arquitectura" />
        </p>

        <button @click="updateProject()">ACTUALIZAR</button>
        <button class="eliminar" @click="closeModal()">CANCELAR</button>
      </div>
    </div>

    <!-- IMPORTAMOS COMPONENTE PARA VER EL FOOTER -->
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
import AdminProjectsCard from "@/components/AdminProjectsCard.vue";
import AdminCandidaturesCard from "@/components/AdminCandidaturesCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewprojects",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminProjectsCard,
    AdminCandidaturesCard
  },
  data() {
    return {
      projects: [],
      candidatures: [],
      username: "",
      id: null,
      /* Variables para cambiar los datos de los proyectos */
      name: "",
      newName: "",
      description: "",
      newDescription: "",
      delivery_date: "",
      newDelivery: "",
      province: "",
      newProvince: "",
      language: "",
      NewLanguage: "",
      technology: "",
      newTechnology: "",
      architecture: "",
      newArchitecture: "",
      /* Variable para crear proyectos */
      correctData: false,
      required: false,
      modal: false,
      modalCandidature: false
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */

    showCandidatures(data) {
      this.id = data.id;
      axios
        .get("http://localhost:3000/all/candidatures/" + this.id)

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.candidatures = response.data.data;
          console.log("Esto es candidatures:", this.candidatures);

          this.modalCandidature = true;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    editProject(data) {
      this.openModal();
      console.log("esto es data", data.id);

      this.newName = data.name_project;
      this.newDescription = data.description;

      this.newDelivery = data.delivery_date;
      this.newProvince = data.province;
      this.NewLanguage = data.language;
      this.newTechnology = data.technology;
      this.newArchitecture = data.architecture;
      this.id = data.id;
    },
    /* Editar datos de un proyecto */

    updateProject() {
      console.log("esto es this.id", this.id);
      axios
        .put("http://localhost:3000/projects/" + this.id, {
          name: this.newName,
          description: this.newDescription,
          delivery_date: this.newDelivery,
          province: this.newProvince,
          language: this.NewLanguage,
          technology: this.newTechnology,
          architecture: this.newArchitecture
        })
        //Si sale bien
        .then(async function(response) {
          await Swal.fire("Se ha modificado el proyecto");

          location.reload();
          this.closeModal();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteProject(data) {
      console.log("Esto es data", data);
      this.id = data.id;
      axios
        .delete("http://localhost:3000/projects/" + this.id, {
          id: this.id
        })
        //SI SALE BIEN
        .then(async function(response) {
          await Swal.fire("Se ha borrado el proyecto");

          location.reload();
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    changeLocation(event) {
      console.log(event.target.value);
      if (event.target.value === "coders") {
        this.$router.push("/view-coders");
      } else if (event.target.value === "projects") {
        this.$router.push("/view-projects");
      } else if (event.target.value === "candidatures") {
        this.$router.push("/view-candidatures");
      } else if (event.target.value === "companies") {
        this.$router.push("/view-companies");
      } else if (event.target.value === "about") {
        this.$router.push("/about");
      }
    },
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
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    closeModalCandidatures() {
      this.modalCandidature = false;
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
@font-face {
  font-family: "serif";
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
.projects {
  font-family: "sansSerif";
}
h1 {
  font-family: "serif";
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  opacity: 0.8;
}
/* MODALES */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  margin: 9.5% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
button {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
button:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.eliminar {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  margin: 1rem;
}
.eliminar:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
label {
  font-weight: bold;
  margin: 1.5rem;
}
input {
  margin: 0.5rem;
  border-radius: 0.4rem;
  text-align: center;
}
::-webkit-input-placeholder {
  color: #27496d;
  text-align: center;
}
::placeholder {
  color: #27496d;
}
.namemain {
  height: 30px;
  width: 300px;
}
</style>