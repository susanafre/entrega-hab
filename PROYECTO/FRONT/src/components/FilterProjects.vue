<template>
  <div class="home">
    <div class="projects" v-for="(project, index) in projects" :key="project.id">
      <p class="name">{{ project.project_name }}</p>
      <p>{{ project.description }}</p>
      <p>EMPRESA: {{ project.company_name }}</p>
      <p>{{ project.language }}</p>
      <p>{{ project.technology }}</p>
      <p>
        Fecha de entrega:
        {{ project.delivery_date | moment("D/M/YYYY") }}
      </p>

      <div class="botones" v-if="userloged">
        <button @click="showCompaniesEvent(index)">Ver empresa</button>
      </div>

      <div class="botoncandidatura" v-if="roleCoder">
        <button
          class="presentarcandidatura"
          @click="createCandidatureEvent(index)"
        >Presentar candidatura</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterProjects",
  props: {
    projects: Array,
    companies: Array,
    userloged: Boolean,
    roleCoder: Boolean
  },
  methods: {
    showCompaniesEvent(index) {
      console.log("Esto es data", data);
      let data = this.companies[index];
      this.$emit("mostrar", data);
    },
    createCandidatureEvent(index) {
      let data2 = this.projects[index].PK_project;
      console.log("Esto es data2", data2);
      this.$emit("crear", data2);
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
.home {
  background-color: #00909e;
  font-family: "sansSerif";
}
.projects {
  display: inline-block;
  width: 50%;
  background-color: #dae1e7;
  padding: 1rem;
  margin: 2rem;
  border-radius: 2rem;
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
  background: #dae1e7;
  color: #27496d;
}
.presentarcandidatura {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
}
.presentarcandidatura:hover {
  background-color: #27496d;
  color: #dae1e7;
}
.name {
  font-family: "serif";
  font-weight: bold;
  font-size: 25px;
}
</style>
