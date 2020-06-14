<template>
  <div class="menu">
    <!-- CREAMOS EL MENÚ CON LOS LINKS Y EL BOTÓN DE DESLOGARSE -->

    <div id="nav">
      <!-- LINKS -->

      <router-link :to="{ name: 'About' }">About</router-link>❇️
      <router-link :to="{ name: 'Productos' }">Productos</router-link>❇️
      <router-link :to="{ name: 'Clientes' }">Clientes</router-link>❇️
      <router-link :to="{ name: 'AddClients' }">Añadir Clientes</router-link>❇️
      <router-link :to="{ name: 'Register' }">Registro</router-link>❇️
      <router-link :to="{ name: 'Login' }">Login</router-link>❇️

      <!-- BOTÓN -->

      <button @click="logoutEvent()">LOGOUT</button>
    </div>
  </div>
</template>

<script>
/* AÑADIMOS EL NAME Y LOS MÉTODOS */
export default {
  name: "MenuCustom",
  methods: {
    logoutEvent() {
      this.$emit("deslogarse");
    },
  },
};
</script>

<style scoped>
/* ###  ESTILOS ### */

@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}
.menu {
  font-family: "dancing";
  background-color: #d098c5;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  font-size: 30px;
  color: #f7f1f6;
}

#nav a.router-link-exact-active {
  color: #bf29a6;
}
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
