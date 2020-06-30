<template>
  <div class="projects">
    <div class="profile" v-for="project in projects" :key="project.id">
      <h1>{{project.name_project}}</h1>
      <p>{{project.description}}</p>
      <p>EMPRESA: {{project.company_name}}</p>
      <p>FECHA DE CREACIÓN:{{project.creation_date | moment("YYYY-M-D")}}</p>

      <p>PROVINCIA: {{project.province}}</p>

      <p>ARCHITECTURE: {{project.architecture}}</p>

      <p>LENGUAJE: {{project.language}}</p>
      <p>FECHA ENTREGA: {{project.delivery_date | moment("YYYY-M-D")}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminProjectsCard",
  props: {
    projects: Array
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
.projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  padding: 2rem;

  color: #27496d;
  background-color: #00909e;
}
.profile {
  background-color: #dae1e7;

  margin: 2rem auto;
  padding: 1rem;
}
h1 {
  padding-top: 1rem;
  color: #27496d;
  font-family: "serif";
}
</style>