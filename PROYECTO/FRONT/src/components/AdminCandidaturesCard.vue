<template>
  <div class="candidatures">
    <div class="profile" v-for="candidature in candidatures" :key="candidature.id">
      <h1>
        <p>{{candidature.name_coder}} {{candidature.surname_coder}}</p>
      </h1>

      <p>EMPRESA: {{candidature.company_name}}</p>

      <p>PROYECTO: {{candidature.project_name}}</p>

      <p>ESTADO: {{candidature.state}}</p>

      <p>FECHA DE SOLICITUD: {{candidature.creation_date | moment("YYYY-M-D")}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCandidaturesCard",
  props: {
    candidatures: Array
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
.candidatures {
  padding: 2rem;
  color: #27496d;
  background-color: #00909e;
}
.profile {
  background-color: #dae1e7;
  width: 60%;
  margin: 2rem auto;
  padding: 2rem;
}
h1 {
  font-family: "serif";
}
</style>