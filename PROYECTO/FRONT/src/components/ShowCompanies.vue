<template>
  <!-- Esto se exporta en Home -->
  <div class="home">
    <div class="companies" v-for="(company,index) in companies" :key="company.id">
      <p class="name">{{company.name}}</p>

      <button @click="showCompaniesEvent(index)">VER MÁS</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowCompanies",
  props: {
    companies: Array
  },
  methods: {
    showCompaniesEvent(index) {
      /* viewCompanies.js */
      let data = this.companies[index];
      this.$emit("mostrar", data);
    }
  }
};
</script>

<style scoped>
.companies {
  display: inline-block;
  border: 1px solid #dae1e7;
  background-color: #27496d;
  color: #dae1e7;
  margin: 1rem;
  width: 20%;
  height: 20%;
  padding: 1rem;
  border-radius: 2rem;
}
.companies > button {
  background: #dae1e7;
  color: #27496d;
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 1rem;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
</style>