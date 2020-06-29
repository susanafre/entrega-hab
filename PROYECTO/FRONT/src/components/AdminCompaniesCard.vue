<template>
  <div class="companies">
    <div class="profile" v-for="(company,index) in companies" :key="company.id">
      <h1>{{company.name}}</h1>
      <p>{{company.description}}</p>
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
          <p>ACTIVO:{{company.active}}</p>
        </tr>

        <tr>
          <p>FECHA DE ALTA:{{company.creation_date | moment("YYYY-M-D")}}</p>
        </tr>
      </td>
      <button @click="activateAccountEvent(index)">ACTIVAR CUENTA</button>
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
  padding-top: 2rem;
  color: #27496d;
  background-color: #00909e;
}
.profile {
  background-color: #dae1e7;
  width: 50%;
  margin: 0 auto;
  padding-right: 2rem;
  padding-left: 2rem;
  box-shadow: 4px 4px #27496d;
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