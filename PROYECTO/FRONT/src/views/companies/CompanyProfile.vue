<template>
  <div class="viewprofile">
    <vue-headful title="Perfil Empresa" description="Puedes ver el perfil de una empresa" />
    <!-- COMPONENTE MENÚ -->

    <MenuLoggedCompany :username="username" v-on:logout="logoutUser"></MenuLoggedCompany>

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

        <button class="editar" @click="showeditText()">EDITAR PERFIL</button>

        <button class="eliminar" @click="openPasswdModal()">CAMBIAR CONTRASEÑA</button>

        <button class="cambiarpasswd" @click="deleteCompany()">ELIMINAR PERFIL</button>
      </div>
    </div>

    <!-- MODAL PARA EDITAR DATOS DEL USUARIO-->

    <div v-show="modal" class="editprofile">
      <div class="editcompany">
        <h1>
          <input v-model="newName" placeholder="Nombre" />
        </h1>
        <label for="descripcion">DESCRIPCIÓN:</label>
        <p>
          <textarea
            name="description"
            id
            cols="30"
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
          <input type="file" placeholder="Imagen" />
        </p>

        <button class="updateprofile" @click="closeModal()">ACTUALIZAR PERFIL</button>
        <button class="cancel" @click="closeModalAux()">CANCELAR</button>
      </div>
    </div>

    <!-- MODAL PARA CAMBIAR LA CONTRASEÑA -->
    <div v-show="modalpasswd" class="modalpasswd">
      <div class="modalBox">
        <h1>CAMBIO DE CONTRASEÑA</h1>
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
import MenuLoggedCompany from "@/components/MenuLoggedCompany.vue";

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
      selectedFile: null,
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

    onFileSelected(event) {
      console.log("Esto es event", event.target.files);
      this.newPhoto = event.target.files[0];
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
      this.newPhoto = data.photo;
      this.newProvince = data.province;
      this.newWeb = data.web;
    },

    /* Editar perfil */

    updateCompany() {
      var self = this;
      axios
        .put("http://localhost:3000/companies/" + this.id, {
          name: this.newName,
          description: this.newDescription,
          email: this.newEmail,
          phone_number: this.newPhone,
          /* photo: this.newPhoto, */
          province: this.newProvince,
          web: this.newWeb
        })
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
  background-color: #dae1e7;
  color: #27496d;
  font-family: "sansSerif";
}

/* DIV DE PERFIL */

.profile {
  background: #00909e;
  padding: 3rem;
}
.companies {
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
  height: 180px;
  width: 200px;
}
label {
  font-weight: bold;
  margin: 0.5rem;
}
input {
  text-align: center;
  color: #27496d;
}

/* BOTONES */
button {
  color: #dae1e7;
  background-color: #27496d;
  font-weight: bold;
  border: 2px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 1rem;
}
/* BOTONES PERFIL */
.editar {
  color: #dae1e7;
  background-color: #27496d;
  font-weight: bold;
  border: 2px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 1rem;
}
.editar:hover {
  background: #dae1e7;
  color: #27496d;
}

.eliminar:hover {
  background: #dae1e7;
  color: #27496d;
}
.cambiarpasswd {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
}
.cambiarpasswd:hover {
  background-color: #27496d;
  color: #dae1e7;
}
.updateprofile {
  background-color: #00909e;
  color: #dae1e7;
}
.updateprofile:hover {
  font-size: 18px;
}
.cancel:hover {
  font-size: 16px;
}

/* DESCRIPCION PERFIL */
.description {
  width: 600px;
  margin: 0 auto;
}

.name {
  font-size: 2rem;
  text-decoration: underline;
}
/* EDITAR PERFIL */
.editcoder > h1 > input {
  font-size: 20px;
  font-weight: bold;
}

/* MODALES */
.editcompany {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 20% auto;
  width: 900px;
  background-color: #dae1e7;
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
  padding-bottom: 1rem;
  margin: 20% auto;
  width: 600px;
  background-color: #dae1e7;
}
</style>