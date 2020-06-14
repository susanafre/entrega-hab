<template>
  <div class="registerpage">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="Register Page" description="Register page of the market" />

    <h1>💮 REGÍSTRATE AQUÍ 💮</h1>
    <div class="register">
      <p>
        EMAIL:
        <br />
        <input type="text" name="email" placeholder="Introduce tu mail aquí" v-model="email" />
      </p>
      <p>
        PASSWORD:
        <br />
        <input
          type="password"
          name="password"
          placeholder="Introduce tu contraseña aquí"
          v-model="password"
        />
      </p>
      <p>
        <button @click="addUser(email, password)">REGISTRARSE</button>
      </p>
    </div>
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
import axios from "axios";
import { clearLogin } from "../api/utils";

import FooterCustom from "@/components/FooterCustom.vue";

export default {
  name: "Register",
  components: {
    FooterCustom
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    validatingData() {
      if (this.email === "" || this.password === "") {
        this.correctData = false; //NO ENVIAR
        this.required = true;
      } else {
        this.correctData = true; //SÍ ENVIAR
        this.required = false;
      }
    },
    addUser(email, password) {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData === true) {
        var self = this;
        axios
          .post("http://localhost:3050/usuarios/add", {
            email: self.email,
            password: self.password
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
    emptyFields() {
      (this.email = ""), (this.password = "");
    },
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    }
  }
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}
.registerpage {
  font-family: "dancing";
  color: #d098c5;
  background-image: url("../assets/fondo.jpg");
  text-align: center;
}
h1 {
  background-color: white;
  width: 20%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.register {
  background-color: white;
  width: 20%;
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
p {
  font-weight: bold;
  padding: 1rem;
}
button {
  background-color: #f7f1f6;
  border-radius: 1rem;
  border: 1px solid #bf29a6;
  padding: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #d098c5;
}
</style>
