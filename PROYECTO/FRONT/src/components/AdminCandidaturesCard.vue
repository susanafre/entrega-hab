<template>
  <div class="candidatures" v-show="modalCandidature">
    <button class="closemodal" @click="closeModalCandidaturesEvent()">Cerrar ventana</button>

    <div class="profile" v-for="candidature in candidatures" :key="candidature.id">
      <h1>
        <p>{{candidature.name_coder}} {{candidature.surname_coder}}</p>
      </h1>

      <p>
        <b>EMPRESA:</b>
        {{candidature.company_name}}
      </p>

      <p>
        <b>PROYECTO:</b>
        {{candidature.project_name}}
      </p>

      <div
        class="state"
        :class="{red: candidature.state === 'No sigues en el proceso' | candidature.state === 'Proceso cerrado'}"
      >
        <b>ESTADO:</b>
        {{candidature.state}}
      </div>

      <p>
        <b>FECHA DE SOLICITUD:</b>
        {{candidature.creation_date | moment("YYYY-M-D")}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCandidaturesCard",
  props: {
    candidatures: Array,
    modalCandidature: Boolean
  },
  methods: {
    closeModalCandidaturesEvent() {
      this.$emit("cerrarModal");
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
.candidatures {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
}
.profile {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 3% auto;
  width: 900px;
  background-color: #27496d;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  color: #dae1e7;
}
h1 {
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