<template>
  <div class="home">
    <div class="projects" v-for="(project, index) in projects" :key="project.id">
      <img :src="require(`../../../BACK/controllers/static/uploads/${project.photo}`)" />
      <h1 class="name">{{ project.project_name }}</h1>

      <div class="botones">
        <p class="empresa">
          EMPRESA: {{ project.company_name }}
          <button @click="showCompaniesEvent(index)">Ver más</button>
        </p>
      </div>

      <p class="description">{{ project.description }}</p>

      <p>
        <b>Fecha de entrega:</b>
        {{ project.delivery_date | moment("D/M/YYYY") }}
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
  background-color: #dae1e7;
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
  width: 60%;
  columns: 2;
  background-color: #27496d;
  padding-top: 0.5rem;
  padding: 1rem;
  margin: 2rem;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
img {
  height: 450px;
  width: 450px;
  border: 1px solid #27496d;
  border-radius: 0.5rem;
}

.description {
  text-align: justify;
}
.empresa {
  font-weight: bold;
  font-size: 20px;
}
.presentarcandidatura {
  color: #dae1e7;
  background-color: #00909e;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
  font-size: 20px;
}
.presentarcandidatura:hover {
  background-color: #dae1e7;
  color: #00909e;
}
.name {
  font-family: "serif";
  font-weight: bold;
  font-size: 35px;
}
.botones > p > button {
  background-color: #27496d;
  border: none;
  box-shadow: none;
  color: #dae1e7;
  font-family: "sansSerif";
  font-size: 20px;
  text-decoration: underline;
}
.botones > p > button:hover {
  color: #00909e;
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
