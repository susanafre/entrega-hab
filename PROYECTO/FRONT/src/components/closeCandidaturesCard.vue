<template>
  <div class="close" v-show="modalCandidature">
    <button class="closemodal" @click="closeModalCandidaturesEvent()">Cerrar ventana</button>

    <div class="candidatures" v-for="(candidature,index) in candidatures" :key="candidature.id">
      <h1>{{candidature.nombre_candidato}} {{candidature.apellidos_candidato}}</h1>

      <p>NOMBRE PROYECTO: {{candidature.nombre_proyecto}}</p>

      <p>ESTADO CANDIDATURA: {{candidature.finalizado}}</p>

      <button @click="getProfleCoderEvent(index)">Ver perfil candidato</button>

      <select name="option" id="option" @change="changeStateEvent($event,index)">
        <option disabled selected>Cambiar estado</option>
        <option value="interested">Sigue en el proceso</option>
        <option value="closed">No sigue en el proceso</option>
      </select>
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
  background-color: #27496d;
  box-shadow: 2px 2px #dae1e7;
  color: #dae1e7;
}
button {
  color: #27496d;
  background-color: #dae1e7;

  border: 1px solid #27496d;
  box-shadow: 2px 2px #dae1e7;
  padding: 0.3rem;

  margin: 1rem;
}

button:hover {
  background-color: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
select {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #dae1e7;
}

.closemodal {
  color: #27496d;
  background-color: #dae1e7;

  border: 1px solid #27496d;
  box-shadow: 2px 2px #dae1e7;
  padding: 0.3rem;

  margin: 3rem;
}
.closemodal:hover {
  background-color: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
</style>