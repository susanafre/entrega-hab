<template>
  <div class="coders">
    <vue-headful title="Ver Coders" description="You can see coders" />
    <!-- IMPORTAMOS COMPONENTE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:cambiar="changeLocation" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <div class="explanation">
      <p>* Aquí puedes ver los desarrolladores registrados, editarlos o eliminarlos. *</p>
    </div>

    <!-- IMPORTAMOS COMPONENTE PARA VER LOS CODERS -->
    <AdminCodersCard
      :coders="coders"
      v-on:activar="activateAccount"
      v-on:editar="showeditText"
      v-on:borrar="deleteCoder"
    ></AdminCodersCard>
    <!-- MODAL PARA EDITAR DATOS DEL USUARIO -->
    <div v-show="modal" class="editprofile">
      <div class="editcoder">
        <h1>EDITAR PERFIL CODER</h1>
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
          <button class="updateprofile" @click="closeModal()">ACTUALIZAR PERFIL</button>
          <button class="cancel" @click="closeModalAux()">CANCELAR</button>
        </p>
      </div>
    </div>
    <!-- IMPORTAMOS FOOTER -->
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
import AdminCodersCard from "@/components/AdminCodersCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewCoders",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminCodersCard
  },
  data() {
    return {
      coders: [],
      username: "",
      id: null,
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
      /* Variables para modales */
      modal: false
    };
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */
    /* Editar perfil */
    /* Eliminar perfil coder */

    deleteCoder(data) {
      this.id = data.PK_coder;
      axios
        .delete("http://localhost:3000/coders/" + this.id)
        //SI SALE BIEN
        .then(async function(response) {
          await Swal.fire("Se ha borrado el cliente");
          location.reload();
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    updateCoder() {
      console.log("Esto es this.id", this.id);
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

          location.reload();
          this.closeModal();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },
    onFileSelected() {
      console.log("Esto es event", this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
    },
    showeditText(data) {
      this.openModal();
      console.log("esto es data", data);
      this.id = data.PK_coder;
      this.newName = data.name;
      this.newSurname = data.surname;
      this.newEmail = data.email;
      this.newArchitecture = data.architecture;
      this.newPhone = data.phone_number;
      this.newProvince = data.province;
      this.newTechnology = data.technology;
      this.newLanguage = data.language;
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
        .get("http://localhost:3000/all/coders")

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.coders = response.data.data;

          console.log("Esto es coders:", this.coders);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    activateAccount(data) {
      this.id = data.PK_coder;
      axios
        .put("http://localhost:3000/account/coder/" + this.id, {
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
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.updateCoder();

      this.modal = false;
    },
    closeModalAux() {
      this.modal = false;
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
@font-face {
  font-family: "serif";
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
.coders {
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  opacity: 0.8;
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
.editcoder h2 input {
  height: 2rem;
  font-size: 15px;
  margin: 3px;
}
.editcoder input {
  border-radius: 0.3rem;
  border: none;
  text-align: center;
}
::-webkit-input-placeholder {
  color: #27496d;
  text-align: center;
}
::placeholder {
  color: #27496d;
}
.editprofile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.cancel {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  border-radius: 5px;
  padding: 0.3rem;
  margin: 1rem;
}
.cancel:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
label {
  font-weight: bold;
  margin: 1.5rem;
}
h1 {
  font-family: "serif";
}
</style>