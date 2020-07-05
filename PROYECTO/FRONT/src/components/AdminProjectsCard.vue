<template>
  <div class="projects">
    <div class="profile" v-for="(project,index) in projects" :key="project.id">
      <h1>{{project.name_project}}</h1>

      <p class="description">{{project.description}}</p>

      <p>
        <b>EMPRESA:</b>
        {{project.company_name}}
      </p>
      <p>
        <b>FECHA DE CREACIÓN:</b>
        {{project.creation_date | moment("D-M-YYYY")}}
      </p>
      <p>
        <b>FECHA ENTREGA:</b>
        {{project.delivery_date | moment("D-M-YYYY")}}
      </p>

      <p>
        <b>PROVINCIA:</b>
        {{project.province}}
      </p>

      <h2>Datos técnicos</h2>
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

      <div class="botones">
        <button @click=" editProjectEvent(index)">Editar</button>
        <button class="eliminar" @click="deleteProjectEvent(index)">Eliminar</button>
        <button @click="showcandidaturesEvent(index)" type="submit">Ver candidaturas</button>
      </div>
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
  animation-duration: 2s;
  animation-name: aparition;
  display: inline-block;
  width: 60%;
  columns: 2;
  background-color: #27496d;
  padding-top: 0.5rem;
  padding: 1rem;
  margin: 1rem;

  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.description {
  text-align: justify;
}
h1 {
  padding-top: 1rem;
  color: #dae1e7;
  font-family: "serif";
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
h2 {
  margin: 2rem;
}
.architecture {
  display: inline-flex;
  font-weight: bold;
  margin-top: 4rem;
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
  margin-bottom: 5rem;
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