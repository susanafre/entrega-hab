<template>
  <div class="menu">
    <router-link :to="{ name: 'ProfileCoder' }">
      <img class="logo" :src="require('../../assets/logo_nombre.png')" alt="logo" />
    </router-link>

    <select name="submenu" id="submenu" @change="changeLocationEvent($event)">
      <option disabled selected>MENÚ</option>
      <option value="coders">CODERS</option>
      <option value="projects">PROYECTOS</option>

      <option value="companies">EMPRESAS</option>
      <option value="about">ABOUT</option>
    </select>

    <button @click="logoutUserEvent()">LOG OUT</button>
    <img class="user" :src="require('../../assets/usuario.png')" alt="usuario" />
    <h1>{{ username }}</h1>
  </div>
</template>

<script>
export default {
  name: "MenuLoggedAdmin",
  props: {
    username: String
  },
  methods: {
    logoutUserEvent() {
      this.$emit("logout");
    },
    changeLocationEvent($event) {
      this.$emit("cambiar", $event);
    }
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
.menu {
  background-color: #142850;
  padding-left: 20rem;
  display: flex;
  display: flex;
  justify-content: center;
  height: 40px;
}
a {
  border: none;
  text-decoration: none;
  background-color: #142850;
  color: #00909e;
  font-weight: bold;
  font-size: 10px;
  font-family: "serif";
  margin-left: 0.7rem;
  margin-right: 0.7rem;
  margin-top: 9px;
}
select {
  font-family: "serif";
  background-color: #142850;
  color: #00909e;
  margin-left: 1rem;
  margin-right: 1rem;
  border: none;
  width: 80px;
}
button {
  border: none;
  background-color: #142850;
  color: #00909e;
  font-weight: bold;
  font-size: 10px;
  font-family: "serif";
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}
button:hover {
  opacity: 0.5;
  border: 1px solid #142850;
}
.logo {
  height: 30px;
  width: 80px;
}
h1 {
  margin-top: 7px;
  font-size: 13px;
  margin-left: 0;
  margin-right: 1rem;
  color: #00909e;
  font-family: "serif";
}
a.router-link-exact-active {
  margin-top: 5px;
  text-decoration: underline;
  color: #dae1e7;
  font-weight: bolder;
}
.user {
  height: 25px;
  width: 25px;
  margin-top: 3.5px;
  margin-right: 7px;
  margin-left: 1rem;
}
</style>
