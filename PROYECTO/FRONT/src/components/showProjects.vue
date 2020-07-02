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

      <p>
        <select name="options" id="options" @change="selectOptionsEvent($event,index)">
          <option disabled selected>Opciones</option>
          <option value="editar">EDITAR PROYECTO</option>
          <option value="candidaturas">VER CANDIDATURAS</option>
          <option value="cerrar">CERRAR PROCESO</option>
          <option value="eliminar">ELIMINAR PROYECTO</option>
        </select>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "showProjects",
  props: {
    projects: Array,
    candidatures: Array,
    emptyCandidature: Boolean
  },
  methods: {
    selectOptionsEvent($event, index) {
      let data = this.projects[index];
      this.$emit("opciones", $event, data);
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

h1 {
  font-family: "serif";
}

.seeprojects {
  animation-duration: 2s;
  animation-name: aparition;
  font-family: "sansSerif";
  background-color: #dae1e7;
  color: #27496d;
  box-shadow: 3px 3px #27496d;
  display: inline-block;
  width: 30%;
  height: 60%;
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

  margin: 1rem;
}
button:hover {
  background-color: #dae1e7;
  color: #27496d;
}
select {
  color: #dae1e7;
  background-color: #27496d;
  font-weight: bold;
  border: 2px solid #dae1e7;
  padding: 0.3rem;

  margin: 1rem;
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