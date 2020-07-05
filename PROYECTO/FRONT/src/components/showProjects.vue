<template>
  <div class="projects">
    <div class="seeprojects" v-for="(project,index) in projects" :key="project.id">
      <h1>{{project.name}}</h1>

      <p class="description">{{project.description}}</p>

      <p>
        <b>PROVINCIA:</b>
        {{project.province}}
      </p>

      <p>
        <b>FECHA DE ENTREGA:</b>
        {{project.delivery_date | moment("YYYY-M-D")}}
      </p>

      <div class="architecture">
        Arquitectura:
        <div
          class="arch"
          :class="{frontend: project.architecture === 'FrontEnd' | project.architecture === 'Front End',backend:project.architecture === 'BackEnd' | project.architecture === 'Back End'}"
        >#{{ project.architecture }}</div>
      </div>

      <p></p>

      <div class="language">
        Lenguaje:
        <div
          class="lang"
          :class="{html:project.language === 'HTML, CSS, Javascript',python:project.language === 'Python',node:project.language === 'Javascript node',php:project.language === 'PHP',sql:project.language === 'SQL'}"
        >#{{ project.language }}</div>
      </div>

      <p></p>

      <div class="technology">
        Tecnología:
        <div
          class="tech"
          :class="{react:project.technology === 'React JS',angular:project.technology === 'Angular',bootstrap:project.technology === 'Bootstrap',redux:project.technology === 'Redux',django:project.technology === 'Django',vue:project.technology === 'Vue js',node:project.technology === 'Node js',laravel:project.technology === 'Laravel',workbench:project.technology === 'MySQL Workbench'}"
        >#{{ project.technology }}</div>
      </div>

      <p>
        <select name="options" id="options" @change="selectOptionsEvent($event,index)">
          <option disabled selected>Opciones</option>
          <option value="editar">EDITAR PROYECTO</option>
          <option value="candidaturas">VER CANDIDATURAS</option>
          <option value="cerrar">CERRAR PROCESO</option>
          <option value="eliminar">ELIMINAR PROYECTO</option>
        </select>
      </p>
      <div class="candidature" v-if="vercandidaturas">
        <div class="cerrarcandidaturasnav">
          <h1 class="titulo">Candidaturas</h1>
          <button @click="closeCandidaturesEvent()" class="cerrarcandidaturas">Cerrar</button>
        </div>

        <div class="candidatures" v-for="(candidature,index) in candidatures" :key="candidature.id">
          <h1>{{candidature.nombre_candidato}} {{candidature.apellidos_candidato}}</h1>

          <b>ESTADO CANDIDATURA:</b>
          <div
            class="estado"
            :class="{red: candidature.finalizado === 'No sigues en el proceso' | candidature.finalizado === 'Proceso cerrado'}"
          >{{candidature.finalizado}}</div>

          <button @click="getProfleCoderEvent(index)">Ver perfil candidato</button>

          <select name="option" id="option" @change="changeStateEvent($event,index)">
            <option disabled selected>Cambiar estado</option>
            <option value="interested">Sigue en el proceso</option>
            <option value="closed">No sigue en el proceso</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showProjects",
  props: {
    projects: Array,
    candidatures: Array,
    emptyCandidature: Boolean,
    vercandidaturas: Boolean
  },
  methods: {
    selectOptionsEvent($event, index) {
      let data = this.projects[index];
      this.$emit("opciones", $event, data);
    },
    changeStateEvent($event, index) {
      let dataCand = this.candidatures[index];
      this.$emit("cambiar", $event, dataCand);
    },
    getProfleCoderEvent(index) {
      let dataCand = this.candidatures[index];

      this.$emit("mostrarPerfil", dataCand);
    },
    closeModalCandidaturesEvent() {
      this.$emit("cerrarModal");
    },
    closeCandidatureEvent(index) {
      let dataCand = this.candidatures[index];

      this.$emit("cerrar", dataCand);
    },
    interestedCandidaturesEvent(index) {
      let dataCand = this.candidatures[index];

      this.$emit("interesado", dataCand);
    },
    closeCandidaturesEvent() {
      this.$emit("cerrarCandidaturas");
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
.titulo {
  text-decoration: underline;
}
.projects {
  padding: 2rem;
  background-color: #dae1e7;
  display: inline-flex;
}
.seeprojects {
  animation-duration: 2s;
  animation-name: aparition;
  font-family: "sansSerif";
  background-color: #27496d;
  padding-top: 0.5rem;
  padding: 1rem;
  margin: 1rem auto;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  width: 800px;
}
.candidature {
  width: 800px;
  background-color: #27496d;

  color: #dae1e7;
  margin: 1rem;
}
.candidatures {
  background-color: #27496d;

  color: #dae1e7;
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
select {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
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
.cerrarcandidaturasnav {
  border-top: 1px solid #dae1e7;
  display: inline-flex;
}
.cerrarcandidaturas {
  padding: 0;
  background-color: #27496d;
  color: #dae1e7;
  border: none;
  box-shadow: none;
}
.cerrarcandidaturas:hover {
  padding: 0;
  background-color: #27496d;
  color: #00909e;
  border: none;
  box-shadow: none;
}
.description {
  text-align: justify;
  margin-left: 2rem;
  margin-right: 2rem;
}
.estado {
  font-weight: bold;
  color: #00909e;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 20px;
}
.red {
  color: red;
  font-weight: bold;
  font-size: 20px;
}

.architecture {
  display: inline-flex;
  font-weight: bold;
}

.frontend {
  font-weight: bold;
  color: #142850;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.backend {
  font-weight: bold;
  color: #00909e;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}

.language {
  display: inline-flex;
  font-weight: bold;
}

.html {
  font-weight: bold;
  color: orange;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.python {
  font-weight: bold;
  color: yellow;
  background: #4a7aa5;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.node {
  font-weight: bold;
  color: white;
  background: #5bcf51;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.php {
  font-weight: bold;
  color: white;
  background: #8f6cb6;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.sql {
  font-weight: bold;
  color: #e5a609;
  background: #398eb0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.technology {
  display: inline-flex;
  font-weight: bold;
}
.react {
  font-weight: bold;
  color: #398eb0;
  background: black;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.angular {
  font-weight: bold;
  color: red;
  background: white;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.bootstrap {
  font-weight: bold;
  color: white;
  background: #4126b2;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.redux {
  font-weight: bold;
  color: #4126b2;
  background: white;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.django {
  font-weight: bold;
  color: white;
  background: #4126b2;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.vue {
  font-weight: bold;
  color: #59b686;
  background: #434e68;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.laravel {
  font-weight: bold;
  color: white;
  background: #e15518;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.workbench {
  font-weight: bold;
  color: #e5a609;
  background: #398eb0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
</style>