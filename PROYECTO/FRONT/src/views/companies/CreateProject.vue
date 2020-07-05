<template>
  <div class="project">
    <vue-headful title="Ver proyectos" description="Página para ver proyectos" />

    <!-- IMPORTAMOS EL COMPONENTE MENÚ -->
    <MenuLoggedCompany :username="username" v-on:logout="logoutUser"></MenuLoggedCompany>

    <div class="explanation">
      <p>* Aquí puedes crear un nuevo proyecto. *</p>
    </div>

    <!-- CREAR PROYECTOS -->

    <div class="create">
      <h1>AÑADE UN NUEVO PROYECTO</h1>
      <div class="columnas">
        <div>
          <label for="name">Introduce el nombre del proyecto</label>

          <p>
            <input
              type="text"
              name="name"
              placeholder="Introduce el nombre del proyecto"
              v-model="name"
            />
          </p>

          <label for="description">Añade una descripción al proyecto</label>

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
        </div>

        <div>
          <label for="delivery_date">Añade la fecha de finalización del proyecto</label>

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
            <input
              type="text"
              name="province"
              placeholder="Introduce la provincia"
              v-model="province"
            />
          </p>

          <label for="language">Introduce el lenguaje</label>
          <p>
            <input
              type="text"
              name="language"
              placeholder="Introduce el lenguaje"
              v-model="language"
            />
          </p>

          <label for="technology">Introduce la/s tecnología/s</label>
          <p>
            <input
              type="text"
              name="technology"
              placeholder="Introduce la/s tecnología/s"
              v-model="technology"
            />
          </p>

          <label for="architecture">Añade la arquitectura</label>
          <p>
            <input
              type="text"
              name="architecture"
              placeholder="Introduce la arquitectura"
              v-model="architecture"
            />
          </p>
        </div>
      </div>

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
        >Añadir</button>
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
    FooterCustom
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
      required: false
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
            architecture: self.architecture
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
          text: "Algo ha ido mal"
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
    }
  },
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
.project {
  font-family: "sansSerif";
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #dae1e7;
}
.create {
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  margin: 3% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  border-bottom: 1px solid #dae1e7;
  opacity: 0.8;
}
.columnas {
  display: grid;
  grid-template-columns: repeat(2, 40% 40%);
  align-items: center;
  margin-left: 9rem;
}
h1 {
  font-family: "serif";
  text-decoration: underline;
  color: #dae1e7;
}

label {
  font-weight: bold;
  margin: 0.5rem;
}
input {
  text-align: center;
  color: #27496d;
}
button {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
button:hover {
  background-color: #00909e;
  color: #dae1e7;
}
</style>
