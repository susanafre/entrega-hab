<template>
  <div id="home">
    <!-- MENÚ PRINCIPAL CON LOS LINKS A LAS PÁGINAS Y LOS BOTONES DE LOGIN -->

    <button @click=" openModalCoderEvent()">
      ACCESO
      CODERS
    </button>

    <img :src="require('../assets/logo_nombre.png')" alt="logo" />

    <button @click="openModalCompanyEvent() ">
      ACCESO
      EMPRESAS
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuPrincipal",
  methods: {
    //MÉTODO QUE ABRE EL MODAL DE LOGIN CODER
    openModalCoderEvent() {
      this.$emit("modalcoder");
    },

    //MÉTODO QUE ABRE EL MODAL DE LOGIN COMPANY
    openModalCompanyEvent() {
      this.$emit("modalcompany");
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "serif";
  src: url("../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../assets/Ubuntu-Regular.ttf");
}
#home {
  background-color: #00909e;
  display: flex;
  justify-content: center;
  height: 30px;
  opacity: 0.8;
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
  background-color: #dae1e7;
  color: #00909e;
  border: 1.5px solid #142850;
}
img {
  height: 30px;
  width: 80px;
}
</style>
