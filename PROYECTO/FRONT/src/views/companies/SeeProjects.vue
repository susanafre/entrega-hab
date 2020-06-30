<template>
  <div class="projects">
    <vue-headful
      title="Ver proyectos"
      description="Página para ver proyectos"
    />

    <!-- IMPORTAMOS EL COMPONENTE MENÚ -->
    <MenuLoggedCompany
      :username="username"
      v-on:logout="logoutUser"
    ></MenuLoggedCompany>

    <!-- SE MUESTRAN LOS PROYECTOS DE LA EMPRESA -->

    <h1>MIS PROYECTOS</h1>

    <!-- COMPONENTE QUE MUESTRA LOS PROYECTOS -->

    <showProjects
      :projects="projects"
      v-on:editar="showEditText"
      v-on:borrar="deleteProject"
      v-on:mostrar="viewCandidatures"
    ></showProjects>

    <!-- COMPONENTE QUE ELIMINA LAS CANDIDATURAS QUE DECIDA EL USUARIO -->

    <closeCandidaturesCard
      :candidatures="candidatures"
      :modalCandidature="modalCandidature"
      v-on:mostrarPerfil="getProfileCoder"
      v-on:cerrarModal="closeModalCandidatures"
      v-on:cerrar="closeCandidatures"
      v-on:interesado="interestedCandidatures"
      v-on:cerrarTodo="closeAllCandidature"
    ></closeCandidaturesCard>

    <!-- MODAL QUE MUESTRA EL PERFIL DE LOS CODERS QUE HAN PRESENTADO SU CANDIDATURA A UN PROYECTO -->

    <div class="modal" v-show="modalProfileCoder">
      <div class="profile">
        <img
          src="'../../../../BACK/controllers/static/uploads/' + coders.photo"
        />
        <h1>{{ coders.name }} {{ coders.surname }}</h1>
        <td>
          <tr>
            <h2>Datos personales</h2>
          </tr>
          <tr>
            <p>EMAIL: {{ coders.email }}</p>
          </tr>
          <tr>
            <p>TELÉFONO: {{ coders.phone_number }}</p>
          </tr>
          <tr>
            <p>PROVINCIA: {{ coders.province }}</p>
          </tr>
        </td>

        <td>
          <tr>
            <h2 class="space">Datos técnicos</h2>
          </tr>
          <tr>
            <p>ARCHITECTURE: {{ coders.architecture }}</p>
          </tr>
          <tr>
            <p>LENGUAJE: {{ coders.language }}</p>
          </tr>
          <tr>
            <p>TECHNOLOGY: {{ coders.technology }}</p>
          </tr>
        </td>

        <p>
          <button @click="closeModalProfileCoder()">Cerrar ventana</button>
        </p>
      </div>
    </div>

    <!-- MODAL PARA EDITAR LOS PROYECTOS -->

    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h1>EDITAR PROYECTO</h1>

        <p>
          <label for="name">NOMBRE:</label>
          <input v-model="newName" placeholder="Nombre" />
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
          <input v-model="newTechnology" placeholder="Tencología" />
        </p>

        <p>
          <label for="architecture">ARQUITECTURA:</label>
          <input v-model="newArchitecture" placeholder="Arquitectura" />
        </p>

        <button @click="updateProject()">ACTUALIZAR</button>
        <button @click="closeModal()">CANCELAR</button>
      </div>
    </div>

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */
import showProjects from "@/components/showProjects.vue";
import MenuLoggedCompany from "../../components/menus/MenuLoggedCompany.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import closeCandidaturesCard from "@/components/closeCandidaturesCard.vue";

import { clearLogin } from "../../api/utils";

export default {
  name: "SeeProjects",
  components: {
    showProjects,
    closeCandidaturesCard,

    MenuLoggedCompany,
    FooterCustom,
  },
  data() {
    return {
      /* Array de projects, candidatures y coders */

      projects: [],
      candidatures: [],
      coders: [],

      /* Variables para ID's */
      id1: "",
      id: null,
      id2: null,
      id3: null,
      /* Variable para username */
      username: "",
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

      /* Variable para modal */
      modal: false,
      modalProject: false,
      modalCandidature: false,
      emptyProjects: false,
      modalcreateproject: false,
      modalProfileCoder: false,
    };
  },
  methods: {
    /*  #### FUNCIONES PRINCIPALES #### */

    validatingData() {
      if (
        this.name === "" ||
        this.description === "" ||
        this.delivery_date === "" ||
        this.province === "" ||
        this.language === "" ||
        this.technology === "" ||
        this.architecture === ""
      ) {
        this.correctData = false; //NO ENVIAR
        this.required = true;
      } else {
        this.correctData = true; //SÍ ENVIAR
        this.required = false;
      }
    },

    /* Vaciar campos */

    emptyFields() {
      this.name = "";
      this.description = "";
      this.delivery_date = "";
      this.province = "";
      this.language = "";
      this.technology = "";
      this.architecture = "";
    },

    /* Cerrar una candidatura */

    closeCandidatures(dataCand) {
      if (localStorage.id) this.id1 = localStorage.id;
      console.log("esto es id1", this.id1);
      console.log("esto es id2", this.id2);
      console.log("esto es id3", this.id3);
      console.log("Esto es dataCand", dataCand);
      this.id3 = dataCand.id_coder;
      axios
        .put(
          "http://localhost:3000/companies/" +
            this.id1 +
            "/candidatures/" +
            this.id2 +
            "/" +
            this.id3,
          {
            id1: this.id1,
            id2: this.id2,
            id3: this.id3,
          }
        )
        .then(async function(response) {
          await Swal.fire("Se ha cerrado la candidatura a este proyecto");
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Indicar que estamos interesados en un coder */

    interestedCandidatures(dataCand) {
      if (localStorage.id) this.id1 = localStorage.id;
      console.log("esto es id1", this.id1);
      console.log("esto es id2", this.id2);
      console.log("esto es id3", this.id3);
      console.log("Esto es dataCand", dataCand);
      this.id3 = dataCand.id_coder;
      axios
        .put(
          "http://localhost:3000/companies/" +
            this.id1 +
            "/candidatures/interested/" +
            this.id2 +
            "/" +
            this.id3,
          {
            id1: this.id1,
            id2: this.id2,
            id3: this.id3,
          }
        )
        .then(async function(response) {
          await Swal.fire(
            "Se ha enviado un mail al coder y se ha cambiado el estado de la candidatura"
          );
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Cerrar todas las candidaturas de un proyecto */

    closeAllCandidature() {
      if (localStorage.id) this.id1 = localStorage.id;

      axios
        .put(
          "http://localhost:3000/companies/" +
            this.id1 +
            "/candidatures/" +
            this.id2 +
            "/all",
          {
            id1: this.id1,
            id2: this.id2,
          }
        )
        .then(async function(response) {
          await Swal.fire(
            "Se han cerrado todas las candidaturas de este proyecto"
          );
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Ver candidaturas a un proyecto */

    viewCandidatures(data) {
      if (localStorage.id) this.id1 = localStorage.id;

      console.log("Esto es data", data.PK_project);
      this.id2 = data.PK_project;
      axios
        .get(
          "http://localhost:3000/companies/" +
            this.id2 +
            "/candidatures/" +
            this.id1,
          {
            id1: this.id1,
            id2: this.id2,
          }
        )
        .then((response) => {
          console.log(response.data);
          console.log(
            "este es el response de candidatures",
            response.data.data
          );
          this.candidatures = response.data.data;

          this.modalCandidature = true;
        })
        .catch(function(error) {
          Swal.fire({
            icon: "error",
            text: "No hay candidaturas para este proyecto",
          });
        });
    },
    /* Ver proyectos */

    viewProjects() {
      if (localStorage.id) this.id1 = localStorage.id;
      axios
        .get("http://localhost:3000/projects/companies/" + this.id1, {
          id1: this.id1,
        })
        //SI SALE BIEN
        .then((response) => {
          console.log(response.data);

          this.projects = response.data.data;
          console.log(this.projects);
          if (!this.projects) this.emptyProjects = true;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Editar datos de un proyecto */

    showEditText(data) {
      this.openModal();
      this.newName = data.name;
      this.newDescription = data.description;

      this.newDelivery = data.delivery_date;
      this.newProvince = data.province;
      this.NewLanguage = data.language;
      this.newTechnology = data.technology;
      this.newArchitecture = data.architecture;
      this.id = data.PK_project;
    },

    /* Editar datos de un proyecto */

    updateProject() {
      var self = this;
      axios
        .put("http://localhost:3000/projects/" + this.id, {
          name: this.newName,
          description: this.newDescription,
          delivery_date: this.newDelivery,
          province: this.newProvince,
          language: this.NewLanguage,
          technology: this.newTechnology,
          architecture: this.newArchitecture,
        })
        //Si sale bien
        .then(async function(response) {
          await Swal.fire("Se ha modificado el proyecto");
          self.closeModal();
          location.reload();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Eliminar un proyecto */

    deleteProject(data) {
      console.log("Esto es data", data.PK_project);
      this.id = data.PK_project;
      axios
        .delete("http://localhost:3000/projects/" + this.id, {
          id: this.id,
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
    getProfileCoder(dataCand) {
      this.id = dataCand.id_coder;
      axios
        .get("http://localhost:3000/coders/" + this.id)

        //SI SALE BIEN
        .then((response) => {
          this.modalCandidature = false;
          this.modalProfileCoder = true;
          this.coders = response.data.data;
          console.log("Esto es coders", this.coders);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    /* #### FUNCIONES "AUXILIARES" */

    /* Desloguearse */
    logoutUser() {
      return clearLogin(location.reload());
    },
    /* Ir al perfil de la empresa */
    buttonProfileCompany() {
      this.$router.push("/company-profile");
    },

    /* Ir a Home */

    buttonHome() {
      this.$router.push("/");
    },

    /* Funciones para abrir y cerrar modales */
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    closeModalCandidatures() {
      this.modalCandidature = false;
    },
    openModalCreateProject() {
      this.modalcreateproject = true;
    },
    closeModalCreateProject() {
      this.emptyFields();
      this.modalcreateproject = false;
    },
    closeModalProfileCoder() {
      this.modalProfileCoder = false;
    },
  },
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  },
  created() {
    this.viewProjects();
  },
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
  background-color: #00909e;
  color: #dae1e7;
}
h1 {
  font-family: "serif";
  padding: 1rem;
  text-decoration: underline;
  color: #27496d;
}

label {
  font-weight: bold;
  margin: 0.5rem;
  color: #27496d;
}
input {
  text-align: center;
  color: #27496d;
}
.profile td {
  display: inline-block;
  margin: 2rem;
}

/* BOTONES */

button {
  background: #27496d;
  color: #dae1e7;
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 1rem;
}
button:hover {
  background: #dae1e7;
  color: #27496d;
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
  padding-bottom: 1rem;
  margin: 10% auto;
  width: 900px;
  background-color: #dae1e7;
}
.createproject {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.create {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 6% auto;
  width: 900px;
  background-color: #dae1e7;
}

.profile {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 10% auto;
  width: 900px;
  background-color: #dae1e7;
  color: #27496d;
}
</style>
