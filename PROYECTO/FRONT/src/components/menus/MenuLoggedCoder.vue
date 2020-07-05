<template>
  <div class="menu">
    <button>
      <router-link :to="{ name: 'HomeCoder' }">BUSCAR PROYECTOS</router-link>
    </button>

    <button>
      <router-link :to="{ name: 'ProfileCoder' }">MI PERFIL</router-link>
    </button>

    <router-link :to="{ name: 'HomeCoder' }">
      <img class="logo" :src="require('../../assets/logo_nombre.png')" alt="logo" />
    </router-link>

    <button>
      <router-link :to="{ name: 'CandidaturesCoder' }">MIS CANDIDATURAS</router-link>
    </button>

    <img class="user" :src="require('../../assets/usuario.png')" alt="usuario" />

    <h1>{{ username }}</h1>

    <div class="boton">
      <button class="logout" @click="logoutUserEvent()">LOG OUT</button>
    </div>
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
  opacity: 0.8;
  font-family: "serif";
  justify-content: center;
  height: 60px;
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
  font-size: 15px;
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
  font-size: 15px;
}
button:hover {
  color: #dae1e7;
  border-bottom: 2px solid #dae1e7;
}
.logo {
  height: 60px;
  width: 120px;
  margin: 0;
  padding: 0;
}
h1 {
  margin-top: 1.3rem;
  font-size: 13px;
  margin-left: 0;
  color: #dae1e7;
  font-family: "serif";
}
a.router-link-exact-active {
  margin-top: 5px;
  font-weight: bold;
  color: #dae1e7;
  font-weight: bolder;
}
.user {
  height: 25px;
  width: 25px;
  margin-top: 1rem;
  margin-right: 5px;
  margin-left: 10rem;
}
.logout {
  margin-top: 1.1rem;
  margin-left: 1rem;
  font-size: 10px;
  border: 1px solid #142850;
  background: #142850;
  color: #dae1e7;
  padding: 4px;
  border-radius: 4px;
}
.logout:hover {
  background: #dae1e7;
  color: #142850;
  border: 0;
}
</style>
