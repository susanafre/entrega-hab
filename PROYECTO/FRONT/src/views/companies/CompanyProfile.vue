<template>
  <div class="viewprofile">
    <vue-headful title="Perfil Empresa" description="Puedes ver el perfil de una empresa" />
    <!-- COMPONENTE MENÚ -->

    <MenuLoggedCompany :username="username" v-on:logout="logoutUser"></MenuLoggedCompany>

    <div class="explanation">
      <p>* Aquí puedes ver el perfil de tu empresa, editarlo o cambiar la contraseña *</p>
    </div>

    <!--  VER PERFIL EMPRESA -->

    <div class="profile">
      <div class="companies">
        <img :src="require(`../../../../BACK/controllers/static/uploads/${companies.photo}`)" />

        <h1>{{companies.name}}</h1>

        <p class="description">{{companies.description}}</p>
        <h2>Datos de contacto</h2>
        <p>EMAIL: {{companies.email}}</p>
        <p>TELÉFONO: {{companies.phone_number}}</p>
        <p>PROVINCIA: {{companies.province}}</p>
        <p>WEB: {{companies.web}}</p>

        <!-- BOTONES PARA ABRIR MODALES -->

        <button class="editar" @click="showeditText()">Editar perfil</button>

        <button class="eliminar" @click="deleteCompany()">Eliminar perfil</button>

        <p>
          <button class="changepasswd" @click="openPasswdModal()">¿Quieres cambiar la contraseña?</button>
        </p>
      </div>
    </div>
    <FooterCustom></FooterCustom>
    <!-- MODAL PARA EDITAR DATOS DEL USUARIO-->

    <div v-show="modal" class="editprofile">
      <div class="editcompany">
        <h1>EDITA EL PERFIL DE TU EMPRESA</h1>
        <h2>
          <input v-model="newName" placeholder="Nombre" />
        </h2>
        <label for="descripcion">DESCRIPCIÓN:</label>
        <p>
          <textarea
            name="description"
            id
            cols="50"
            rows="10"
            v-model="newDescription"
            placeholder="Descripción"
          ></textarea>
        </p>
        <h2>Datos de contacto</h2>
        <p>
          <label for="email">EMAIL:</label>
          <input v-model="newEmail" placeholder="Email" />
        </p>
        <p>
          <label for="phone">TELÉFONO:</label>
          <input v-model="newPhone" placeholder="Teléfono" />
        </p>

        <!-- v-model="newPhoto" -->

        <p>
          <label for="province">PROVINCIA:</label>
          <input v-model="newProvince" placeholder="Provincia" />
        </p>

        <p>
          <label for="web">WEB:</label>
          <input v-model="newWeb" placeholder="Web" />
        </p>
        <p>
          <label for="photo">FOTO:</label>
          <input type="file" id="file" ref="file" @change="onFileSelected" placeholder="Imagen" />
        </p>

        <button class="updateprofile" @click="closeModal()">Actualizar perfil</button>
        <button class="cancel" @click="closeModalAux()">Cancelar</button>
      </div>
    </div>

    <!-- MODAL PARA CAMBIAR LA CONTRASEÑA -->
    <div v-show="modalpasswd" class="modalpasswd">
      <div class="modalBox">
        <label for="passwd">Introduzca su contraseña actual</label>
        <p>
          <input
            type="password"
            v-model="newOldPassword"
            placeholder="Introduce la contraseña actual"
          />
        </p>
        <label for="passwd">Introduzca la nueva contraseña</label>
        <p>
          <input
            type="password"
            v-model="newerPassword"
            placeholder="Introduce la nueva contraseña"
          />
        </p>
        <label for="passwd">Repite la nueva contraseña</label>
        <p>
          <input
            type="password"
            v-model="newerPasswordRepeat"
            placeholder="Repite la nueva contraseña"
          />
        </p>

        <button class="cambiarpasswd" @click="changePassword()">Cambiar contraseña</button>
        <button class="cancel" @click="closePasswdModal()">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */
import FooterCustom from "@/components/FooterCustom.vue";
import MenuLoggedCompany from "../../components/menus/MenuLoggedCompany.vue";

/* IMPORTAMOS FUNCIONES DE UTILS.JS */
import { getRole } from "../../api/utils";
import { clearLogin } from "../../api/utils";

export default {
  name: "CompanyProfile",
  components: {
    FooterCustom,
    MenuLoggedCompany
  },
  data() {
    return {
      /* Array de companies */
      companies: [],
      /* Variables para id y username */
      id: "",

      /* Variables para editar el perfil */
      username: "",
      name: "",
      newName: "",
      description: "",
      newDescription: "",
      email: "",
      newEmail: "",
      phone_number: "",
      newPhone: "",
      photo: "",
      newPhoto: "",
      province: "",
      newProvince: "",
      web: "",
      newWeb: "",
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
      modalpasswd: false
    };
  },
  methods: {
    /*  #### FUNCIONES PRINCIPALES #### */

    onFileSelected() {
      console.log("Esto es event", this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
    },

    /* Obtener los datos del perfil de la empresa */
    getCompanies(id) {
      if (localStorage.id) {
        this.id = localStorage.id;
      }
      axios
        .get("http://localhost:3000/companies/" + this.id)

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.companies = response.data.data;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Editar perfil */

    showeditText() {
      this.openModal();
      let data = this.companies;
      this.newName = data.name;
      this.newDescription = data.description;
      this.newEmail = data.email;
      this.newPhone = data.phone_number;

      this.newProvince = data.province;
      this.newWeb = data.web;
    },

    /* Editar perfil */

    updateCompany() {
      var self = this;

      let photoFormData = new FormData();

      photoFormData.append("name", this.newName);
      photoFormData.append("description", this.newDescription);
      photoFormData.append("email", this.newEmail);
      photoFormData.append("phone_number", this.newPhone);
      photoFormData.append("province", this.newProvince);
      photoFormData.append("web", this.newWeb);

      if (this.file != null) {
        photoFormData.append("photo", this.file);
      }

      axios
        .put(`http://localhost:3000/companies/${this.id}`, photoFormData)
        //Si sale bien
        .then(async function(response) {
          await Swal.fire("Se ha modificado el cliente");
          location.reload();
          this.closeModal();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Eliminar perfil */

    deleteCompany(id) {
      if (localStorage.id) {
        this.id = localStorage.id;
      }
      axios
        .delete("http://localhost:3000/companies/" + this.id)
        //SI SALE BIEN
        .then(async function(response) {
          await Swal.fire("Se ha borrado el perfil");
          return clearLogin();
          location.reload();
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
        .post("http://localhost:3000/companies/" + this.id + "/password", {
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
    /* #### FUNCIONES AUXILIARES #### */
    /* Desloguearse */
    logoutUser() {
      return clearLogin(location.reload());
    },

    /* Funciones para mostrar u ocultar modales */
    openPasswdModal() {
      this.modalpasswd = true;
    },
    closePasswdModal() {
      this.modalpasswd = false;
    },
    closeModal() {
      this.updateCompany();
      this.modal = false;
    },
    closeModalAux() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    }
  },
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  },
  created() {
    this.getCompanies();
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
/* DIV GENERAL */
.viewprofile {
  font-family: "sansSerif";
  background-color: #dae1e7;
  color: #dae1e7;
}

/* DIV DE PERFIL */

.profile {
  padding: 3rem;
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 3rem;
}
.companies {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  width: 700px;
  background-color: #27496d;
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

  width: 250px;
}
label {
  font-weight: bold;
  margin: 0.5rem;
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
  border-radius: 5px;
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
/* DESCRIPCION PERFIL */
.description {
  width: 600px;
  margin: 0 auto;
  text-align: justify;
}

.name {
  font-size: 2rem;
  text-decoration: underline;
}
/* EDITAR PERFIL */
.editcompany > h1 > input {
  font-size: 20px;
  font-weight: bold;
}

/* MODALES */
.editcompany {
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  margin: 5% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.editcompany > h1 {
  color: #dae1e7;
}
.editcompany input {
  margin: 0.5rem;
  border-radius: 0.4rem;
}
#file {
  color: #dae1e7;
}
h2 > input {
  height: 2rem;
  font-size: 20px;
}
.editprofile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
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
</style>