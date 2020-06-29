<template>
  <div class="projects">
    <div class="seeprojects" v-for="(project,index) in projects" :key="project.id">
      <h1>{{project.name}}</h1>

      <p class="description">{{project.description}}</p>

      <p>{{project.province}}</p>
      <p>LENGUAJE: {{project.language}}</p>
      <p>TECNOLOGÍA: {{project.technology}}</p>
      <p>ARQUITECTURA: {{project.architecture}}</p>
      <p>FECHA DE ENTREGA: {{project.delivery_date | moment("YYYY-M-D")}}</p>
      <button @click="editProjectEvent(index)">EDITAR</button>

      <button @click="showCandidaturesEvent(index)">VER CANDIDATURAS</button>

      <button class="delete" @click="deleteProjectEvent(index)">ELIMINAR PROYECTO</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "showProjects",
  props: {
    projects: Array,
    emptyCandidature: Boolean
  },
  methods: {
    showCandidaturesEvent(index) {
      let data = this.projects[index];
      this.$emit("mostrar", data);
    },
    editProjectEvent(index) {
      let data = this.projects[index];

      this.$emit("editar", data);
    },
    deleteProjectEvent(index) {
      let data = this.projects[index];
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

h1 {
  font-family: "serif";
}
.seeprojects {
  font-family: "sansSerif";
  background-color: #dae1e7;
  color: #27496d;
  box-shadow: 2px 2px #27496d;
  display: inline-block;
  width: 50%;
  height: 50%;
  padding: 1rem;
  margin: 1rem;
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
.delete {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
}
.delete:hover {
  background-color: #27496d;
  color: #dae1e7;
}
.emptyCandidature {
  font-weight: bold;
}
</style>