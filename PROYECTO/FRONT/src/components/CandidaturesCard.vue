<template>
  <!-- Esto se exporta en CandidaturesCoder.vue -->
  <div class="candidatures">
    <div class="candidaturas" v-for="(candidature,index) in candidatures" :key="candidature.id">
      <h1>{{candidature.project_name}}</h1>

      <p>
        <b>Empresa:</b>
        {{candidature.company_name}}
      </p>

      <p>
        <b>Fecha candidatura:</b>
        {{candidature.creation_date | moment("D-M-YYYY")}}
      </p>

      <div
        class="state"
        :class="{red: candidature.state === 'No sigues en el proceso' | candidature.state === 'Proceso cerrado'}"
      >
        <b>ESTADO:</b>
        {{candidature.state}}
      </div>

      <button @click="deleteCandidatureEvent(index)">Cancelar</button>
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
      let data = this.candidatures[index];
      console.log("Esto es data hola", data);
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
@keyframes aparition {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.candidaturas {
  animation-duration: 2s;
  animation-name: aparition;
  font-family: "sansSerif";
  background-color: #27496d;

  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  display: inline-block;
  width: 50%;
  height: 50%;
  padding: 1rem;
  margin: 2rem;
}
h1 {
  font-family: "serif";
  font-size: 20px;
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
.state {
  font-weight: bold;
  color: #00909e;

  font-size: 20px;
}
.red {
  color: red;
  font-weight: bold;
  font-size: 20px;
}
</style>