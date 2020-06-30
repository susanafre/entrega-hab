<template>
  <div class="project">
    <vue-headful
      title="Ver proyectos"
      description="Página para ver proyectos"
    />

    <!-- IMPORTAMOS EL COMPONENTE MENÚ -->
    <MenuLoggedCompany
      :username="username"
      v-on:logout="logoutUser"
    ></MenuLoggedCompany>

    <!-- CREAR PROYECTOS -->

    <div class="create">
      <h1>PÁGINA PARA CREAR PROYECTOS</h1>

      <p>
        <label for="name">Introduce el nombre del proyecto</label>
      </p>
      <p>
        <input type="text" name="name" v-model="name" />
      </p>

      <p>
        <label for="description">Añade una descripción al proyecto</label>
      </p>

      <p>
        <textarea
          name="description"
          id
          cols="30"
          rows="10"
          placeholder="Mínimo 20 caracteres"
          v-model="description"
        ></textarea>
      </p>

      <p>
        <label for="delivery_date"
          >Añade la fecha de finalización del proyecto</label
        >
      </p>

      <p>
        <input
          type="text"
          name="delivery_date"
          placeholder="Formato aaaa-mm-dd"
          v-model="delivery_date"
        />
      </p>
      <label for="province">Añade la provincia</label>
      <p>
        <input type="text" name="province" v-model="province" />
      </p>
      <label for="language">Introduce el lenguaje</label>
      <p>
        <input type="text" name="language" v-model="language" />
      </p>
      <label for="technology">Introduce la/s tecnología/s</label>
      <p>
        <input type="text" name="technology" v-model="technology" />
      </p>
      <label for="architecture">Añade la arquitectura</label>
      <p>
        <input type="text" name="architecture" v-model="architecture" />
      </p>

      <p>
        <button
          @click="
            addProject(
              name,
              description,
              delivery_date,
              province,
              language,
              technology,
              architecture
            )
          "
        >
          AÑADIR PROYECTO
        </button>
      </p>
    </div>

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */

import MenuLoggedCompany from "../../components/menus/MenuLoggedCompany.vue";
import FooterCustom from "@/components/FooterCustom.vue";

import { clearLogin } from "../../api/utils";

export default {
  name: "CreateProject",
  components: {
    MenuLoggedCompany,
    FooterCustom,
  },
  data() {
    return {
      /* Variables para ID's */

      id1: "",

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

    /* Crear proyecto */

    addProject(
      name,
      description,
      delivery_date,
      province,
      language,
      technology,
      architecture
    ) {
      if (localStorage.id) {
        this.id1 = localStorage.id;
      }

      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData === true) {
        let self = this;
        axios
          .post("http://localhost:3000/projects/" + this.id1, {
            name: self.name,
            description: self.description,
            delivery_date: self.delivery_date,
            province: self.province,
            language: self.language,
            technology: self.technology,
            architecture: self.architecture,
          })
          .then(async function(response) {
            await Swal.fire("Se ha creado el proyecto correctamente");
            self.emptyFields(); //VACIAR CAMPOS
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo ha ido mal",
        });
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

    /* #### FUNCIONES "AUXILIARES" */

    /* Desloguearse */
    logoutUser() {
      return clearLogin(location.reload());
    },
  },
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
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
.project {
  font-family: "sansSerif";
  background-color: #00909e;
  color: #dae1e7;
}
.create {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 6% auto;
  width: 900px;
  background-color: #dae1e7;
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
</style>
