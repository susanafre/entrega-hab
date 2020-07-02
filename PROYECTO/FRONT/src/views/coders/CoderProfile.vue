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
            <p>EMAIL: {{coders.email}}</p>
          </tr>
          <tr>
            <p>TELÉFONO: {{coders.phone_number}}</p>
          </tr>
          <tr>
            <p>PROVINCIA: {{coders.province}}</p>
          </tr>
        </td>

        <td>
          <tr>
            <h2 class="space">Datos técnicos</h2>
          </tr>
          <tr>
            <p>ARQUITECTURA: {{coders.architecture}}</p>
          </tr>
          <tr>
            <p>LENGUAJE: {{coders.language}}</p>
          </tr>
          <tr>
            <p>TECNOLOGÍA: {{coders.technology}}</p>
          </tr>
        </td>

        <!-- BOTONES PARA ABRIR MODALES -->
        <p>
          <button class="editar" @click="showeditText()">Editar perfil</button>

          <button class="cambiarpasswd" @click="openPasswdModal()">Cambiar contraseña</button>
        </p>
        <button class="eliminar" @click="deleteCoder()">Eliminar perfil</button>
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
        <h1>Cambiar contraseña</h1>
        <p>
          <input type="password" v-model="newOldPassword" placeholder="Antigua Contraseña" />
        </p>
        <p>
          <input
            type="password"
            v-model="newerPassword"
            placeholder="Introduce la nueva contraseña"
          />
        </p>
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
  color: #27496d;
}
/* DIV VER PERFIL */
.profile {
  background: #00909e;
  padding: 3rem;
}

.coder {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  width: 800px;
  background-color: #dae1e7;
}

/* GENERAL */
h1 {
  color: #27496d;
  font-family: "serif";
}
h2 {
  text-decoration: underline;
  font-family: "serif";
}
img {
  border-radius: 50%;
  border: 8px solid #27496d;

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
}
input {
  text-align: center;
  color: #27496d;
}
.editcoder input {
  margin: 0.5rem;
}

.coder td {
  display: inline-block;
  margin: 4rem;
}
.editcoder td {
  display: inline-block;
  margin: 3rem;
}

/* BOTONES */
button {
  color: #dae1e7;
  background-color: #27496d;

  border: 1px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;

  margin: 1rem;
}
button:hover {
  background-color: #dae1e7;
  color: #27496d;
  border: 1px solid #27496d;
}
/* BOTONES PERFIL */

.eliminar {
  color: #27496d;
  background-color: #dae1e7;

  border: 1px solid #27496d;
  box-shadow: 2px 2px #dae1e7;
  padding: 0.3rem;

  margin: 1rem;
}
.eliminar:hover {
  background-color: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}

.updateprofile {
  color: #dae1e7;
  background-color: #27496d;

  border: 1px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;

  margin: 1rem;
}
.updateprofile:hover {
  background-color: #dae1e7;
  color: #27496d;
  border: 1px solid #27496d;
}
.cancel {
  color: #27496d;
  background-color: #dae1e7;

  border: 1px solid #27496d;
  box-shadow: 2px 2px #dae1e7;
  padding: 0.3rem;

  margin: 1rem;
}
.cancel:hover {
  background-color: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
/* MODALES */
.editcoder {
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  margin: 3% auto;
  width: 900px;
  background-color: #00909e;
  color: #dae1e7;
  box-shadow: 1px 1px 1px #dae1e7;
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
  background-color: #00909e;
  color: #dae1e7;
  box-shadow: 1px 1px 1px #dae1e7;
}
</style>
