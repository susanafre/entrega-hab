<template>
  <div class="viewprofile">
    <vue-headful
      title="Perfil desarrollador"
      description="Página para ver perfil de un desarrollador"
    />

    <!-- COMPONENTE MENU -->
    <div v-show="roleCoder" class="userloged">
      <MenuLoggedCoder :username="username" v-on:logout="logoutUser"></MenuLoggedCoder>
    </div>

    <div v-show="roleAdmin" class="userloged">
      <MenuLoggedAdmin :username="username" v-on:cambiar="changeLocation" v-on:logout="logoutUser"></MenuLoggedAdmin>
    </div>

    <div class="explanation">
      <p>* Aquí puedes ver tu perfil, editarlo o cambiar la contraseña *</p>
    </div>
    <!-- VER PERFIL DESARROLLADOR -->

    <div class="profile">
      <div class="coder">
        <img :src="require(`../../../../BACK/controllers/static/uploads/${coders.photo}`)" />

        <h1>{{coders.name}} {{coders.surname}}</h1>
        <td>
          <tr>
            <h2>Datos personales</h2>
          </tr>
          <tr>
            <p>
              <b>EMAIL:</b>
              {{coders.email}}
            </p>
          </tr>
          <tr>
            <p>
              <b>TELÉFONO:</b>
              {{coders.phone_number}}
            </p>
          </tr>
          <tr>
            <p>
              <b>PROVINCIA:</b>
              {{coders.province}}
            </p>
          </tr>
        </td>

        <td>
          <tr>
            <h2 class="space">Datos técnicos</h2>
          </tr>
          <tr>
            <p></p>
            <div class="architecture">
              Arquitectura:
              <div
                class="arch"
                :class="{frontend: coders.architecture === 'FrontEnd' | coders.architecture === 'Front End',backend:coders.architecture === 'BackEnd' | coders.architecture === 'Back End'}"
              >#{{ coders.architecture }}</div>
            </div>
          </tr>
          <tr>
            <div class="language">
              Lenguaje:
              <div
                class="lang"
                :class="{html:coders.language === 'HTML, CSS, Javascript',python:coders.language === 'Python',node:coders.language === 'Javascript node',php:coders.language === 'PHP',sql:coders.language === 'SQL'}"
              >#{{ coders.language }}</div>
            </div>
          </tr>
          <tr>
            <div class="technology">
              Tecnología:
              <div
                class="tech"
                :class="{react:coders.technology === 'React JS',angular:coders.technology === 'Angular',bootstrap:coders.technology === 'Bootstrap',redux:coders.technology === 'Redux',django:coders.technology === 'Django',vue:coders.technology === 'Vue js',node:coders.technology === 'Node js',laravel:coders.technology === 'Laravel',workbench:coders.technology === 'MySQL Workbench'}"
              >#{{ coders.technology }}</div>
            </div>
          </tr>
        </td>

        <!-- BOTONES PARA ABRIR MODALES -->
        <p>
          <button class="editar" @click="showeditText()">Editar perfil</button>
          <button class="eliminar" @click="deleteCoder()">Eliminar perfil</button>
        </p>
        <button class="changepasswd" @click="openPasswdModal()">¿Quieres cambiar la contraseña?</button>
      </div>
    </div>

    <!-- MODAL PARA EDITAR DATOS DEL USUARIO -->
    <div v-show="modal" class="editprofile">
      <div class="editcoder">
        <h1>EDITA TU PERFIL</h1>
        <h2>
          <input v-model="newName" placeholder="Nombre" />
          <input v-model="newSurname" placeholder="Apellidos" />
        </h2>

        <h2>Datos personales</h2>
        <p>
          <label for="email">EMAIL:</label>
          <input v-model="newEmail" placeholder="Email" />
        </p>

        <p>
          <label for="phone">TELÉFONO:</label>
          <input v-model="newPhone" placeholder="Teléfono" />
        </p>
        <p>
          <label for="province">PROVINCE:</label>
          <input v-model="newProvince" placeholder="Provincia" />
        </p>

        <h2 class="space">Datos técnicos</h2>

        <p>
          <label for="photo">FOTO:</label>
          <input type="file" id="file" ref="file" @change="onFileSelected" placeholder="Imagen" />
        </p>

        <p>
          <label for="architecture">ARQUITECTURA:</label>
          <input v-model="newArchitecture" placeholder="Arquitectura" />
        </p>
        <p>
          <label for="language">LENGUAJE:</label>
          <input v-model="newLanguage" placeholder="Lenguaje" />
        </p>

        <p>
          <label for="technology">TECHNOLOGY:</label>
          <input v-model="newTechnology" placeholder="Tecnología" />
        </p>

        <!-- BOTÓN PARA ACTUALIZAR DATOS Y CERRAR EL MODAL -->
        <p>
          <button class="updateprofile" @click="closeModal()">Actualizar perfil</button>
          <button class="cancel" @click="closeModalAux()">Cancelar</button>
        </p>
      </div>
    </div>
    <!-- MODAL PARA CAMBIAR LA CONTRASEÑA -->
    <div v-show="modalpasswd" class="modalpasswd">
      <div class="modalBox">
        <label for="password">Introduzca su contraseña actual</label>
        <p>
          <input
            type="password"
            placeholder="Introduce la contraseña actual"
            v-model="newOldPassword"
          />
        </p>

        <label for="password">Introduzca la nueva contraseña</label>

        <p>
          <input
            type="password"
            v-model="newerPassword"
            placeholder="Introduce la nueva contraseña"
          />
        </p>
        <label for="password">Repite la nueva contraseña</label>
        <p>
          <input
            type="password"
            v-model="newerPasswordRepeat"
            placeholder="Repite la nueva contraseña"
          />
        </p>
        <!-- BOTONES PARA ACTUALIZAR LA CONTRASEÑA Y CERRAR EL MODAL -->
        <button class="cambiarpasswd" @click="changePassword()">CAMBIAR CONTRASEÑA</button>
        <button class="cancel" @click="closePasswdModal()">CANCELAR</button>
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

import FooterCustom from "@/components/FooterCustom.vue";
import MenuLoggedCoder from "../../components/menus/MenuLoggedCoder.vue";
import MenuLoggedAdmin from "../../components/menus/MenuLoggedAdmin.vue";

/* IMPORTAMOS FUNCIONES DE UTILS.JS */
import { clearLogin } from "../../api/utils";
import { getRole } from "../../api/utils";

export default {
  name: "ViewProfileCoder",
  components: {
    FooterCustom,
    MenuLoggedCoder,
    MenuLoggedAdmin
  },
  data() {
    return {
      /* Array de coders */
      coders: [],
      /* Obtenemos el id del coder */
      id: "",
      /* Variables para editar el perfil */
      username: "",
      newName: "",
      name: "",
      newSurname: "",
      surname: "",
      newEmail: "",
      email: "",
      newArchitecture: "",
      architecture: "",
      newPhone: "",
      phone_number: "",
      newProvince: "",
      province: "",
      newTechnology: "",
      technology: "",
      newLanguage: "",
      language: "",
      file: null,
      /* Variables para cambiar la contraseña */
      oldPassword: "",
      newOldPassword: "",
      newPassword: "",
      newerPassword: "",
      newPasswordRepeat: "",
      newerPasswordRepeat: "",
      /* Variables para modales */
      modal: false,
      modalpasswd: false,

      /* Variables que checkean el rol del usuario */
      roleCoder: false,
      roleAdmin: false
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */

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
    onFileSelected() {
      console.log("Esto es event", this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
    },

    /* Ver perfil coder */
    getCoders(id) {
      if (localStorage.id) {
        this.id = localStorage.id;
      }
      axios
        .get("http://localhost:3000/coders/" + this.id)

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.coders = response.data.data;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Editar perfil */

    showeditText() {
      this.openModal();

      let data = this.coders;
      this.newName = data.name;
      this.newSurname = data.surname;
      this.newEmail = data.email;
      this.newArchitecture = data.architecture;
      this.newPhone = data.phone_number;
      this.newProvince = data.province;
      this.newTechnology = data.technology;
      this.newLanguage = data.language;
    },

    /* Editar perfil */

    updateCoder() {
      var self = this;

      let photoFormData = new FormData();

      photoFormData.append("name", this.newName);
      photoFormData.append("surname", this.newSurname);
      photoFormData.append("email", this.newEmail);
      photoFormData.append("architecture", this.newArchitecture);
      photoFormData.append("phone_number", this.newPhone);
      photoFormData.append("province", this.newProvince);
      photoFormData.append("technology", this.newTechnology);
      photoFormData.append("language", this.newLanguage);

      if (this.file != null) {
        photoFormData.append("photo", this.file);
      }

      axios
        .put(`http://localhost:3000/coders/${this.id}`, photoFormData)
        //Si sale bien
        .then(async function(response) {
          await Swal.fire("Se ha modificado el cliente");
          self.closeModal();
          location.reload();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Eliminar perfil coder */

    deleteCoder(id) {
      if (localStorage.id) {
        this.id = localStorage.id;
      }
      axios
        .delete("http://localhost:3000/coders/" + this.id)
        //SI SALE BIEN
        .then(async function(response) {
          await Swal.fire("Se ha borrado el cliente");
          return clearLogin();
          this.$route("/").push;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Cambiar contraseña */

    changePassword(id) {
      if (localStorage.id) {
        this.id = localStorage.id;
      }
      axios
        .post("http://localhost:3000/coders/" + this.id + "/password", {
          oldPassword: this.newOldPassword,
          newPassword: this.newerPassword,
          newPasswordRepeat: this.newerPasswordRepeat
        })
        //SI SALE BIEN
        .then(async function(response) {
          await Swal.fire("Se ha cambiado la contraseña, haz login de nuevo");
          clearLogin();
          location.reload();
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* #### FUNCIONES "AUXILIARES" #### */
    /* Desloguearse */
    logoutUser() {
      return clearLogin(location.reload());
    },

    /* Funciones para abrir y cerrar modales */
    openPasswdModal() {
      this.modalpasswd = true;
    },
    closePasswdModal() {
      this.modalpasswd = false;
    },
    closeModal() {
      this.updateCoder();

      this.modal = false;
    },
    closeModalAux() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    },
    checkCoderRole() {
      if (localStorage.role === "coder") {
        this.roleCoder = true;
        console.log("Esto es roleCoder:", this.roleCoder);
      }
    },

    checkAdminRole() {
      if (localStorage.role === "admin") {
        this.roleAdmin = true;
        console.log("Esto es roleAdmin:", this.roleAdmin);
      }
    }
  },
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  },
  created() {
    this.getCoders();
    this.checkCoderRole();

    this.checkAdminRole();
  }
};
</script>

<style scoped>
/* FONT FAMILY */
@font-face {
  font-family: "serif";
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
/* DIV PRINCIPAL */
.viewprofile {
  font-family: "sansSerif";
  background-color: #dae1e7;
  color: #dae1e7;
}
.profile {
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 3rem;
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  border-bottom: 1px solid #dae1e7;
  opacity: 0.8;
}
/* DIV VER PERFIL */

.coder {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  width: 700px;
  background-color: #27496d;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}

/* GENERAL */
h1 {
  color: #dae1e7;
  font-family: "serif";
}
h2 {
  text-decoration: underline;
  font-family: "serif";
}
img {
  border-radius: 50%;
  border: 8px solid #dae1e7;

  width: 150px;
}
label {
  font-weight: bold;
  margin: 1rem;
}
h1 > input {
  font-family: "serif";
  font-size: 20px;
  font-weight: bold;
  height: 30px;
}
input {
  text-align: center;
  color: #27496d;
}
::-webkit-input-placeholder {
  color: #27496d;
  text-align: center;
}
::placeholder {
  color: #27496d;
}
.editcoder input {
  margin: 0.5rem;
  border-radius: 0.4rem;
}

.coder td {
  display: inline-block;
  margin-left: 2rem;
  margin-right: 2rem;
}

/* BOTONES */
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
/* BOTONES PERFIL */

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
.cambiarpasswd {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
.cambiarpasswd:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.changepasswd {
  color: #dae1e7;
  background-color: #27496d;
  border: none;
}
.changepasswd:hover {
  color: #dae1e7;
  background-color: #27496d;
  border: none;
}
.updateprofile {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
.updateprofile:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.cancel {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  margin: 1rem;
}
.cancel:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
/* MODALES */
.editcoder {
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  margin: 9.5% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.editcoder > h1 {
  color: #dae1e7;
}
.editprofile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
h2 > input {
  height: 2rem;
  font-size: 20px;
}
#file {
  color: #dae1e7;
}

.modal {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  width: 800px;

  background-color: #dae1e7;
}
.modalpasswd {
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
  margin: 17% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}

.architecture {
  display: inline-flex;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
}

.frontend {
  font-weight: bold;
  color: #142850;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.backend {
  font-weight: bold;
  color: #00909e;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}

.language {
  display: inline-flex;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
}

.html {
  font-weight: bold;
  color: orange;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.python {
  font-weight: bold;
  color: yellow;
  background: #4a7aa5;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.node {
  font-weight: bold;
  color: white;
  background: #5bcf51;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.php {
  font-weight: bold;
  color: white;
  background: #8f6cb6;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.sql {
  font-weight: bold;
  color: #e5a609;
  background: #398eb0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.technology {
  display: inline-flex;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
}
.react {
  font-weight: bold;
  color: #398eb0;
  background: black;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.angular {
  font-weight: bold;
  color: red;
  background: white;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.bootstrap {
  font-weight: bold;
  color: white;
  background: #4126b2;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.redux {
  font-weight: bold;
  color: #4126b2;
  background: white;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.django {
  font-weight: bold;
  color: white;
  background: #4126b2;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.vue {
  font-weight: bold;
  color: #59b686;
  background: #434e68;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.laravel {
  font-weight: bold;
  color: white;
  background: #e15518;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.workbench {
  font-weight: bold;
  color: #e5a609;
  background: #398eb0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
</style>
