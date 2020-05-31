

<template>
  <div>
    <!-- AÑADIMOS LOS DATOS DE LA API MEDIANTE UN V-FOR-->
    <div class="card" v-for="char in chars" :key="char.id">
      <h2 id="name">{{char.name}}</h2>
      <h2>ID: {{char.id}}</h2>
      <h2>Status: {{char.status}}</h2>
      <h2>Specie: {{char.specie}}</h2>
      <h2>Gender: {{char.gender}}</h2>
      <img :src="char.image" />
      <h2>Origin: {{char.origin.name}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChardCard",
  props: {
    chars: Array
  }
};
</script>

<!-- ESTILOS -->
<style scoped>
#name {
  font-size: 50px;

  font-family: sans-serif;
  -webkit-text-stroke: 1px black;
  display: inline-block;
  padding: 5px;
}

.card {
  width: 40%;
  border: 1px solid black;
  background-color: #1db2d3;
  font-family: sans-serif;
  display: inline-block;
  color: rgb(57, 241, 11);
  margin: 1rem;
}
</style>
