<template>
  <div class="pageclientes">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="Clients Page" description="Clients page of the market" />

    <MenuCustom v-on:deslogarse="logoutUser"></MenuCustom>

    <!-- MODAL PARA EDITAR CLIENTES -->
    <div class="clientes">
      <h1>💮 PÁGINA DE CLIENTES 💮</h1>

      <form>
        <p>
          <input v-model="newName" placeholder="Introduzca nombre" />
        </p>
        <p>
          <input v-model="newSurname" placeholder="Introduzca apellido" />
        </p>
        <p>
          <input v-model="newCity" placeholder="Introduzca ciudad" />
        </p>
        <p>
          <input v-model="newCompany" placeholder="Introduzca empresa" />
        </p>
      </form>
      <button @click="updateClient()">ACTUALIZAR</button>

      <!-- /MODAL PARA EDITAR CLIENTES -->
      <ShowClients :clientes="clientes" v-on:editar="showEditText" v-on:borrar="deleteClients"></ShowClients>

      <FooterCustom></FooterCustom>
    </div>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS, COMPONENTES Y FUNCIONES */

import axios from "axios";
import ShowClients from "@/components/ShowClients.vue";
import Swal from "sweetalert2";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import { clearLogin } from "../api/utils";

/* COMPONENTES */

export default {
  name: "Clientes",
  components: {
    ShowClients,
    MenuCustom,
    FooterCustom
  },

  /* DATA */

  data() {
    return {
      //Variable donde se guardarán los datos de clientes
      clientes: [],
      //VARIABLES DE NOMBRE
      //Variable donde guardo el texto de la nota
      nombre: "",
      //Variable donde guardo el nuevo nombre
      newName: "",

      //VARIABLES PARA APELLIDO
      apellido: "",
      newSurname: "",
      //VARIABLES PARA CIUDAD
      ciudad: "",
      newCity: "",
      //VARIABLES PARA EMPRESA
      empresa: "",
      newCompany: "",
      //La id será null por defecto
      id: null,
      //Creamos variable para modal que será por defecto false
      modal: false
    };
  },

  /* MÉTODOS */

  methods: {
    /* ### GETCLIENTS ### */
    //FUNCION QUE RECOGE LOS CLIENTES
    getClients() {
      var self = this;
      axios
        .get("http://localhost:3050/clientes")
        //SI SALE BIEN
        .then(function(response) {
          console.log(response);
          self.clientes = response.data;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* ### SHOWEDITTEXT ### */

    showEditText(data) {
      this.newName = data.nombre;
      this.newSurname = data.apellido;
      this.newCity = data.ciudad;
      this.newCompany = data.empresa;
      this.id = data.id;
    },

    /* ### UPDATECLIENT ### */

    //FUNCIÓN PARA ACTUALIZAR DATOS DE CLIENTE
    updateClient() {
      var self = this;
      axios
        .put("http://localhost:3050/clientes/update/" + this.id, {
          id: this.id,
          nombre: this.newName,
          apellido: this.newSurname,
          ciudad: this.newCity,
          empresa: this.newCompany
        })
        //Si sale bien
        .then(async function(response) {
          await Swal.fire("Se ha modificado el cliente");

          location.reload();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },

    /* ### DELETECLIENTS ### */

    //FUNCIÓN PARA BORRAR LOS DATOS DE CLIENTE
    deleteClients(data) {
      this.id = data;
      axios
        .delete("http://localhost:3050/clientes/del/" + this.id, {
          id: this.id
        })
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

    /* ### OPENMODAL ### */

    openModal() {
      this.modal = true;
    },

    /* ### CLOSEMODAL ### */

    closeModal() {
      this.modal = false;
    },

    /* ### LOGOUTUSER ### */

    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    }
  },

  /* HOOK CREATED */

  created() {
    this.getClients();
  }
};
</script>

<style scoped>
/* ESTILOS */

/* EXPORTAMOS FUENTE */

@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}

/* DIV GENERAL */

.clientes {
  font-family: "dancing";
  background-image: url("../assets/fondo.jpg");
  text-align: center;
  margin: 1rem auto;
}

/* H1 */

h1 {
  color: #d098c5;
  background-color: white;
  margin: 0 auto;
  text-align: center;
  padding: 1rem;
  width: 30%;
}

/* BUTTON */

button {
  font-family: "dancing";
  background-color: #f7f1f6;
  border-radius: 1rem;
  border: 1px solid #bf29a6;
  padding: 15px;
  font-size: 15px;
  font-weight: bold;

  color: #d098c5;
}
</style>
