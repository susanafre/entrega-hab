<template>
  <div class="close" v-show="modalCandidature">
    <button class="closemodal" @click="closeModalCandidaturesEvent()">Cerrar ventana</button>

    <div class="candidatures" v-for="(candidature,index) in candidatures" :key="candidature.id">
      <h1>{{candidature.nombre_candidato}} {{candidature.apellidos_candidato}}</h1>

      <p>NOMBRE PROYECTO: {{candidature.nombre_proyecto}}</p>

      <p>ESTADO CANDIDATURA: {{candidature.finalizado}}</p>

      <button @click="getProfleCoderEvent(index)">Ver perfil candidato</button>
      <button class="closecand" @click="closeCandidatureEvent(index)">Cerrar candidatura</button>
      <button @click="interestedCandidaturesEvent(index)">Nos interesa</button>
      <button
        class="closeallcand"
        @click="closeAllCandidaturesEvent()"
      >Cerrar todas las candidaturas</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "closeCandidaturesCard",
  props: {
    candidatures: Array,
    coders: Array,
    modalCandidature: Boolean
  },
  methods: {
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
    closeAllCandidaturesEvent() {
      this.$emit("cerrarTodo");
    }
  }
};
</script>

<style scoped>
.close {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
}
.candidatures {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  width: 900px;
  background-color: #dae1e7;
  color: #27496d;
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
.closecand {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
}
.closecand:hover {
  background-color: #27496d;
  color: #dae1e7;
}
.closeallcand {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
}
.closeallcand:hover {
  background-color: #27496d;
  color: #dae1e7;
}
.closemodal {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
  margin-top: 16rem;
}
.closemodal:hover {
  background-color: #27496d;
  color: #dae1e7;
}
</style>