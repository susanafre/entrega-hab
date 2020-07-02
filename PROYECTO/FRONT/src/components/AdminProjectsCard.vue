<template>
  <div class="projects">
    <div class="profile" v-for="(project,index) in projects" :key="project.id">
      <h1>{{project.name_project}}</h1>
      <p>{{project.description}}</p>
      <p>EMPRESA: {{project.company_name}}</p>
      <p>FECHA DE CREACIÓN:{{project.creation_date | moment("YYYY-M-D")}}</p>

      <p>PROVINCIA: {{project.province}}</p>

      <p>ARCHITECTURE: {{project.architecture}}</p>

      <p>LENGUAJE: {{project.language}}</p>
      <p>FECHA ENTREGA: {{project.delivery_date | moment("YYYY-M-D")}}</p>
      <button @click=" editProjectEvent(index)">Editar</button>
      <button class="eliminar" @click="deleteProjectEvent(index)">Eliminar</button>
      <button @click="showcandidaturesEvent(index)" type="submit">Ver candidaturas</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminProjectsCard",
  props: {
    projects: Array
  },
  methods: {
    showcandidaturesEvent(index) {
      let data = this.projects[index];
      this.$emit("mostrar", data);
    },
    editProjectEvent(index) {
      let data = this.projects[index];
      this.$emit("editar", data);
    },
    deleteProjectEvent(index) {
      let data = this.projects[index];
      this.$emit("eliminar", data);
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
.projects {
  background-color: #00909e;
}
.profile {
  animation-duration: 2s;
  animation-name: aparition;
  background-color: #dae1e7;
  display: inline-block;
  width: 40%;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 3px 3px #27496d;
  color: #27496d;
}
h1 {
  padding-top: 1rem;
  color: #27496d;
  font-family: "serif";
}
button {
  color: #dae1e7;
  background-color: #27496d;
  font-weight: bold;
  border: 2px solid #dae1e7;
  box-shadow: 2px 2px #27496d;
  padding: 0.3rem;
  font-weight: normal;
  margin: 1rem;
}
button:hover {
  background-color: #dae1e7;
  color: #27496d;
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
</style>