<template>
  <div class="companies">
    <div class="profile" v-for="(company,index) in companies" :key="company.id">
      <h1>{{company.name}}</h1>
      <p class="description">{{company.description}}</p>

      <div class="active" v-if="(company.active === 0)">
        <p>CUENTA NO ACTIVADA</p>
        <button @click="activateAccountEvent(index)">ACTIVAR CUENTA</button>
      </div>

      <td>
        <tr>
          <p>EMAIL: {{company.email}}</p>
        </tr>
        <tr>
          <p>TELÉFONO: {{company.phone_number}}</p>
        </tr>
        <tr>
          <p>PROVINCIA: {{company.province}}</p>
        </tr>
      </td>

      <td>
        <tr>
          <p>WEB: {{company.web}}</p>
        </tr>

        <tr>
          <p>FECHA DE ALTA:{{company.creation_date | moment("YYYY-M-D")}}</p>
        </tr>
      </td>
      <button @click="editCompanyEvent(index)">EDITAR</button>
      <button class="eliminar" @click="deleteCompanyEvent(index)">ELIMINAR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCompaniesCard",
  props: {
    companies: Array
  },
  methods: {
    activateAccountEvent(index) {
      let data = this.companies[index];
      this.$emit("activar", data);
    },
    editCompanyEvent(index) {
      let data = this.companies[index];
      this.$emit("editar", data);
    },
    deleteCompanyEvent(index) {
      let data = this.companies[index];
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

.companies {
  background-color: #00909e;
}
.profile {
  animation-duration: 2s;
  animation-name: aparition;
  background-color: #dae1e7;
  display: inline-block;
  padding: 2rem;
  margin: 3rem;
  box-shadow: 3px 3px #27496d;
  color: #27496d;
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
.eliminar {
  color: #27496d;
  background-color: #dae1e7;

  border: 1px solid #27496d;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;

  margin: 1rem;
}
.eliminar:hover {
  background-color: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
.description {
  text-align: justify;
}
</style>