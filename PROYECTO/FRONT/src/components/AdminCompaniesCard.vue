<template>
  <div class="companies">
    <div class="profile" v-for="(company,index) in companies" :key="company.id">
      <div class="columna1">
        <h1>{{company.name}}</h1>
        <div class="active" v-if="(company.active === 0)">
          <p>CUENTA NO ACTIVADA</p>
          <button @click="activateAccountEvent(index)">ACTIVAR CUENTA</button>
        </div>
        <p class="description">{{company.description}}</p>
      </div>

      <div class="columna3">
        <p>EMAIL: {{company.email}}</p>

        <p>TELÉFONO: {{company.phone_number}}</p>

        <p>PROVINCIA: {{company.province}}</p>

        <p>WEB: {{company.web}}</p>

        <p>FECHA DE ALTA:{{company.creation_date | moment("D-M-YYYY")}}</p>
      </div>

      <div class="columna4">
        <button @click="editCompanyEvent(index)">EDITAR</button>
        <button class="eliminar" @click="deleteCompanyEvent(index)">ELIMINAR</button>
      </div>
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
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 1rem;
  display: grid;
  align-items: center;
  justify-items: center;
}
.profile {
  align-items: center;

  width: 1200px;
  animation-duration: 2s;
  animation-name: aparition;
  background-color: #27496d;
  padding: 1rem;
  box-shadow: 1rem 1rem 1rem #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  display: grid;
  margin: 1rem;
  grid-template-columns: repeat(3, 65% 20% 15%);
}
h1 {
  padding-top: 1rem;
  color: #dae1e7;
  font-family: "serif";
}

.profile td {
  display: inline-block;
  margin: 2rem;
}
button {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
button:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.eliminar {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  border-radius: 5px;
  padding: 0.3rem;
  margin: 1rem;
}
.eliminar:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
.description {
  text-align: justify;
}
</style>