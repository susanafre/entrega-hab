<template>
  <div class="coders">
    <div class="profile" v-for="(coder,index) in coders" :key="coder.id">
      <h1>{{coder.name}} {{coder.surname}}</h1>
      <td>
        <tr>
          <p>EMAIL: {{coder.email}}</p>
        </tr>
        <tr>
          <p>TELÉFONO: {{coder.phone_number}}</p>
        </tr>
        <tr>
          <p>PROVINCIA: {{coder.province}}</p>
        </tr>
        <tr>
          <p>ACTIVO:{{coder.active}}</p>
        </tr>
      </td>

      <td>
        <tr>
          <p>ARCHITECTURE: {{coder.architecture}}</p>
        </tr>
        <tr>
          <p>LENGUAJE: {{coder.language}}</p>
        </tr>
        <tr>
          <p>TECHNOLOGY: {{coder.technology}}</p>
        </tr>

        <tr>
          <p>FECHA DE ALTA:{{coder.creation_date | moment("YYYY-M-D")}}</p>
        </tr>
      </td>
      <button @click="activateAccountEvent(index)">ACTIVAR CUENTA</button>
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
.coders {
  padding-top: 2rem;
  color: #27496d;
  background-color: #00909e;
}
.profile {
  background-color: #dae1e7;
  width: 60%;
  margin: 0 auto;
}
h1 {
  padding-top: 1rem;
  color: #27496d;
  font-family: "serif";
}

.profile td {
  display: inline-block;
  margin: 2rem;
}
button {
  color: #dae1e7;
  background-color: #27496d;
  font-weight: bold;
  border: 2px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 1rem;
}
button:hover {
  background-color: #dae1e7;
  color: #27496d;
}
</style>