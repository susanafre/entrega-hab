<template>
  <div class="home">
    <div class="projects" v-for="(project, index) in projects" :key="project.id">
      <p class="name">{{ project.project_name }}</p>
      <p class="description">{{ project.description }}</p>
      <div class="botones">
        EMPRESA:
        <button @click="showCompaniesEvent(index)">{{ project.company_name }}</button>
      </div>

      <p>Arquitectura: {{ project.architecture }}</p>
      <p>Lenguaje: {{ project.language }}</p>
      <p>Tecnología: {{ project.technology }}</p>
      <p>
        Fecha de entrega:
        {{ project.delivery_date | moment("D/M/YYYY") }}
      </p>

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

    roleCoder: Boolean
  },
  methods: {
    showCompaniesEvent(index) {
      console.log("Esto es data", data);
      let data = this.projects[index].PK_company;
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

@keyframes aparition {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.projects {
  animation-duration: 2s;
  animation-name: aparition;
  display: inline-block;
  width: 40%;

  background-color: #dae1e7;
  padding: 1rem;
  margin: 2rem;
  box-shadow: 3px 3px #27496d;
}
.description {
  text-align: justify;
}
.presentarcandidatura {
  color: #dae1e7;
  background-color: #27496d;

  border: 1px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;

  margin: 1rem;
}
.presentarcandidatura:hover {
  background-color: #dae1e7;
  color: #27496d;
  border: 1px solid #27496d;
}
.name {
  font-family: "serif";
  font-weight: bold;
  font-size: 25px;
}
.botones > button {
  background-color: #dae1e7;
  border: none;
  box-shadow: none;
  color: #27496d;
  font-family: "sansSerif";
  font-size: 20px;
  text-decoration: underline;
}
.botones > button:hover {
  color: #00909e;
}
</style>
