<template>
  <div class="loginpage">
    <div class="login">
      <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

      <vue-headful title="Login Page" description="Login page of the market" />

      <h1>💮 BIENVENID@ A HACKAMARKET! 💮</h1>

      <p>
        EMAIL:
        <input type="text" placeholder="Introduce tu email" v-model="email" />
      </p>
      <p>
        LOGIN:
        <input type="password" placeholder="Introduce tu contraseña" v-model="password" />
      </p>
      <p>
        <button @click="login()">LOGIN</button>
      </p>
    </div>
  </div>
</template>

<script>
import { loginUser } from "../api/utils";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        //INTENTO HACER LOGIN
        await loginUser(this.email, this.password);

        //SI HAY LOGIN, QUE ME LLEVE AL HOME
        this.$router.push("/productos");
      } catch (err) {
        alert(`Error: ${err}`);
      }
    }
  }
};
</script>

<style scoped>
/* AÑADIMOS EL CSS */

@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}

.loginpage {
  background-image: url("../assets/fondo.jpg");
}
.login {
  text-align: center;
  font-family: "dancing";
  background-color: #d098c5;
  color: #f7f1f6;
  font-weight: bold;
  padding: 2rem;
  margin: 10% auto;
  width: 30%;
}

h1 {
  -webkit-text-stroke: 1px #bf29a6;
  color: #f7f1f6;
}
p {
  font-size: 1.2rem;
}

button {
  font-family: "dancing";
  background-color: #f7f1f6;
  border-radius: 1rem;
  border: 1px solid #bf29a6;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #d098c5;
}
</style>
