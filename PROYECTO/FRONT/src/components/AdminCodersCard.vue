<template>
  <div class="coders">
    <div class="profile" v-for="(coder,index) in coders" :key="coder.id">
      <h1>{{coder.name}} {{coder.surname}}</h1>

      <div class="active" v-if="(coder.active === 0)">
        <p>CUENTA NO ACTIVADA</p>
        <button @click="activateAccountEvent(index)">ACTIVAR CUENTA</button>
      </div>

      <p>EMAIL: {{coder.email}}</p>

      <p>TELÉFONO: {{coder.phone_number}}</p>

      <p>PROVINCIA: {{coder.province}}</p>

      <p>ARCHITECTURE: {{coder.architecture}}</p>

      <p>LENGUAJE: {{coder.language}}</p>

      <p>TECHNOLOGY: {{coder.technology}}</p>

      <p>FECHA DE ALTA:{{coder.creation_date | moment("YYYY-M-D")}}</p>

      <button @click="editProfileEvent(index)">EDITAR PERFIL</button>
      <button @click="deleteProfileEvent(index)">ELIMINAR PERFIL</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCodersCard",
  props: {
    coders: Array
  },
  methods: {
    activateAccountEvent(index) {
      let data = this.coders[index];
      this.$emit("activar", data);
    },
    editProfileEvent(index) {
      let data = this.coders[index];
      this.$emit("editar", data);
    },
    deleteProfileEvent(index) {
      let data = this.coders[index];
      this.$emit("borrar", data);
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
@keyframes aparition {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
button {
  color: #dae1e7;
  background-color: #27496d;

  border: 1px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;

  margin: 1rem;
}
button:hover {
  background-color: #dae1e7;
  color: #27496d;
  border: 1px solid #27496d;
}
.coders {
  background-color: #00909e;
}
.profile {
  animation-duration: 2s;
  animation-name: aparition;
  background-color: #dae1e7;
  display: inline-block;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 3px 3px #27496d;
  color: #27496d;
}
</style>