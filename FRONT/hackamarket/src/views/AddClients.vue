<template>
  <div class="addclients">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="Add Clients Page" description="Add Clients page of the market" />

    <!-- COMPONENTE MENU CUSTOM -->

    <MenuCustom v-on:deslogarse="logoutUser"></MenuCustom>
    <!-- FORMULARIO  -->

    <div class="addclients">
      <!-- TÍTULO DEL FORMULARIO -->

      <h1>💮 AÑADIR CLIENTES 💮</h1>

      <!-- ALERTA SI NO ESTÁN TODOS LOS DATOS RELLENADOS -->

      <div class="clientes">
        <p class="show" v-show="required">Tienes datos aún por rellenar</p>

        <!-- NOMBRE -->

        <p>
          <label for="nombre">NOMBRE:</label>
          <input type="text" name="nombre" placeholder="Nombre del cliente" v-model="nombre" />
        </p>

        <!-- APELLIDOS -->

        <p>
          <label for="apellido">APELLIDO:</label>
          <input type="text" name="apellido" placeholder="Apellido del cliente" v-model="apellido" />
        </p>

        <!-- CIUDAD -->

        <p>
          <label for="ciudad">CIUDAD:</label>
          <input type="text" name="ciudad" placeholder="Ciudad del cliente" v-model="ciudad" />
        </p>

        <!-- EMPRESA -->

        <p>
          <label for="empresa">EMPRESA:</label>
          <input type="text" name="empresa" placeholder="Empresa del cliente" v-model="empresa" />
        </p>

        <!-- BOTÓN AÑADIR CLIENTE -->

        <p>
          <button @click="addClient(nombre, apellido, ciudad, empresa)">CREAR</button>
        </p>
      </div>
    </div>
    <!-- /FORMULARIO -->

    <!-- FOOTER -->

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS, COMPONENTES Y FUNCIONES */
import axios from "axios";
import { clearLogin } from "../api/utils";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";

/* INDICAMOS LOS COMPONENTES */
export default {
  name: "AddClients",
  components: {
    MenuCustom,
    FooterCustom
  },

  /* DATA */

  data() {
    return {
      nombre: "",
      apellido: "",
      ciudad: "",
      empresa: "",
      correctData: false,
      required: false
    };
  },

  /* MÉTODOS */

  methods: {
    /* VALIDAMOS LOS DATOS INTRODUCIDOS */

    validatingData() {
      if (
        this.nombre === "" ||
        this.apellido === "" ||
        this.ciudad === "" ||
        this.empresa === ""
      ) {
        this.correctData = false; //NO ENVIAR
        this.required = true;
      } else {
        this.correctData = true; //SÍ ENVIAR
        this.required = false;
      }
    },

    /* ADDCLIENT */

    addClient(nombre, apellido, ciudad, empresa) {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData === true) {
        var self = this;
        axios
          .post("http://localhost:3050/clientes/add", {
            nombre: self.nombre,
            apellido: self.apellido,
            ciudad: self.ciudad,
            empresa: self.empresa
          })
          .then(function(response) {
            self.emptyFields(); //VACIAR CAMPOS
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        alert("No has rellenado todos los campos");
      }
    },

    /* EMPTYFIELDS */

    emptyFields() {
      this.nombre = "";
      this.apellido = "";
      this.ciudad = "";
      this.empresa = "";
    },

    /* LOGOUTUSER */

    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    }
  }
};
</script>

<style scoped>
/* ESTILOS */

/* IMPORTAMOS FUENTE */

@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}

/* DIV PRINCIPAL */

.addclients {
  font-family: "dancing";
  text-align: center;
  color: #d098c5;
  background-image: url("../assets/fondo.jpg");
  height: 600px;
}

/* DIV CONTENEDOR */

.clientes {
  background-color: white;
  width: 30%;
  padding: 1rem;
  margin: 0 auto;
  margin-top: 5rem;
}

/* H1 */

h1 {
  background-color: white;
  padding: 1rem;
  width: 30%;
  margin: 0 auto;
  margin-top: 5rem;
}
</style>
