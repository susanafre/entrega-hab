<template>
  <div class="companies">
    <vue-headful title="Ver empresas" description="You can see all companies" />
    <!-- IMPORTAMOS COMPONENTE MENÚ -->
    <MenuLoggedAdmin :username="username" v-on:cambiar="changeLocation" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <div class="explanation">
      <p>* Aquí puedes ver las empresas registradas, editarlas o eliminarlas. *</p>
    </div>

    <!-- IMPORTAMOS COMPONENTE PARA VER LAS EMPRESAS -->
    <AdminCompaniesCard
      :companies="companies"
      v-on:activar="activateAccount"
      v-on:editar="showeditText"
      v-on:borrar="deleteCompany"
    ></AdminCompaniesCard>

    <!-- MODAL PARA EDITAR DATOS DEL USUARIO-->

    <div v-show="modal" class="editprofile">
      <div class="editcompany">
        <h1>EDITAR PERFIL</h1>
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
    <!-- IMPORTAMOS COMPONENTE FOOTER -->
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
import AdminCompaniesCard from "@/components/AdminCompaniesCard.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

export default {
  name: "AdminViewCompanies",
  components: {
    MenuLoggedAdmin,
    FooterCustom,
    AdminCompaniesCard
  },
  data() {
    return {
      companies: [],
      username: "",
      id: null,
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
      /* Variables para modales */
      modal: false
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
    /* Eliminar perfil */

    deleteCompany(data) {
      this.id = data.PK_company;
      axios
        .delete("http://localhost:3000/companies/" + this.id)
        //SI SALE BIEN
        .then(async function(response) {
          await Swal.fire("Se ha borrado el perfil");

          location.reload();
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Editar perfil */

    showeditText(data) {
      this.openModal();
      console.log("esto es data", data);
      this.id = data.PK_company;
      this.newName = data.name;
      this.newDescription = data.description;
      this.newEmail = data.email;
      this.newPhone = data.phone_number;

      this.newProvince = data.province;
      this.newWeb = data.web;
    },

    /* Editar perfil */

    updateCompany() {
      console.log("Esto es this.id", this.id);

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
    /* Ver perfil coder */
    getCoders() {
      axios
        .get("http://localhost:3000/all/companies")

        //SI SALE BIEN
        .then(response => {
          console.log(response.data);
          //console.log(response.data);

          this.companies = response.data.data;
          console.log("Esto es companies:", this.companies);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    /* FUNCIÓN PARA ACTIVAR CUENTA */
    activateAccount(data) {
      this.id = data.PK_company;
      axios
        .put("http://localhost:3000/account/company/" + this.id, {
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
    /* FUNCIÓN QUE DESLOGUEA AL USUARIO */

    logoutUser() {
      return clearLogin(location.reload());
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
.editcompany {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 10% auto;
  width: 700px;
  background-color: #27496d;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  color: #dae1e7;
}
label {
  font-weight: bold;
  margin: 1.5rem;
}
h1 {
  font-family: "serif";
}
input {
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
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  opacity: 0.8;
}
.editcompany > h1 {
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
  padding-bottom: 1rem;
  margin: 20% auto;
  width: 600px;
  background-color: #dae1e7;
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
</style>