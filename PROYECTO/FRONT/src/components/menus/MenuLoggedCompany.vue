<template>
  <div class="menu">
    <button>
      <router-link :to="{ name: 'CreateProjects' }">NUEVO PROYECTO</router-link>
    </button>

    <button>
      <router-link :to="{ name: 'ProfileCompany' }">PERFIL</router-link>
    </button>
    <router-link :to="{ name: 'ProjectsCompany' }">
      <img class="logo" :src="require('../../assets/logo_nombre.png')" alt="logo" />
    </router-link>
    <button>
      <router-link :to="{ name: 'ProjectsCompany' }">MIS PROYECTOS</router-link>
    </button>

    <button @click="logoutUserEvent()">LOG OUT</button>
    <img class="user" :src="require('../../assets/usuario.png')" alt="usuario" />
    <h1>{{ username }}</h1>
  </div>
</template>

<script>
export default {
  name: "MenuLoggedCoder",
  props: {
    username: String
  },
  methods: {
    logoutUserEvent() {
      this.$emit("logout");
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
  background-color: #00909e;
  padding-left: 20rem;
  display: flex;
  display: flex;
  justify-content: center;
  height: 40px;
}
a {
  border: none;
  text-decoration: none;
  background-color: #00909e;
  color: #142850;
  font-weight: bold;
  font-size: 10px;
  font-family: "serif";
  margin-left: 0.7rem;
  margin-right: 0.7rem;
  margin-top: 9px;
}
button {
  border: none;

  background-color: #00909e;
  color: #142850;
  font-weight: bold;
  font-size: 10px;
  font-family: "serif";
  margin-left: 0.7rem;
  margin-right: 0.7rem;
}
button:hover {
  opacity: 0.5;
  border-bottom: 1px solid #142850;
}
.logo {
  height: 30px;
  width: 80px;
  margin: 0;
  padding: 0;
}
h1 {
  margin-top: 7px;
  font-size: 13px;
  margin-left: 0;
  color: #142850;
  font-family: "serif";
}
a.router-link-exact-active {
  margin-top: 5px;
  border-bottom: 2px solid #dae1e7;
  color: #dae1e7;
  font-weight: bolder;
  font-size: 12px;
}
.user {
  height: 25px;
  width: 25px;
  margin-top: 2.5px;
  margin-right: 5px;
  margin-left: 10rem;
}
</style>
