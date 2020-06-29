<template>
  <!-- Esto se exporta en CandidaturesCoder.vue -->
  <div class="candidatures">
    <div class="candidaturas" v-for="(candidature,index) in candidatures" :key="candidature.id">
      <h1>{{candidature.name_project}}</h1>

      <p>{{candidature.description_project}}</p>
      <p class="state">ESTADO: {{candidature.estado}}</p>
      <button @click="deleteCandidatureEvent(index)">CANCELAR CANDIDATURA</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CandidaturesCard",

  props: {
    candidatures: Array
  },
  methods: {
    deleteCandidatureEvent(index) {
      let data = this.candidatures[index].PK_candidature;
      console.log("Esto es data", data);
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
.candidaturas {
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
h1 {
  font-family: "serif";
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
.state {
  font-weight: bold;
  font-size: 20px;
}
</style>