

<template>
  <div>
    <!-- AÑADIMOS LOS DATOS DE LA API MEDIANTE UN V-FOR-->
    <div class="card" v-for="char in chars" :key="char.id">
      <h1 id="name">{{char.name}}</h1>
      <p>ID: {{char.id}}</p>
      <p>Status: {{char.status}}</p>
      <p>Specie: {{char.specie}}</p>
      <p>Gender: {{char.gender}}</p>
      <p>
        <img :src="char.image" />
      </p>

      <p>Origin: {{char.origin.name}}</p>
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
p {
  font-weight: bold;
  font-size: 20px;
}
</style>
