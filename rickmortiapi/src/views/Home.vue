<template>
  <div class="home">
    <!-- CÓDIGO ANTIGUO 
      <ChardCard
      v-for="char in chars"
      :key="char.id"
      :charName="char.name"
      :charId="char.id"
      :charStatus="char.status"
      :charSpecie="char.species"
      :charGender="char.gender"
      :charImage="char.image"
      :charOriginName="char.origin.name"
    ></ChardCard>-->

    <!-- IMAGEN DE LOGOTIPO-->
    <figure>
      <img src="../image/logotipo.png" alt title />
    </figure>

    <!-- BARRA DE BÚSQUEDA-->

    <h2>Busca tu personaje</h2>

    <label for="bySearch">Busca tu personaje:</label>

    <input v-model="search" id="search" name="bySearch" type="search" placeholder="Búsqueda" />
    <input v-model="id" placeholder="Introduce el ID del personaje" />
    <button @click="searchChar(id)">Buscar por ID</button>

    <p>{{char.name}}</p>
    <hr />

    <!--CÓDIGO OPTIMIZADO -->

    <ChardCard :chars="filteredChars"></ChardCard>
  </div>
</template>

<script>
// @ is an alias to /src
import ChardCard from "@/components/ChardCard.vue";
//importando la configuración de la API
import api from "@/api/api.js";

export default {
  name: "Home",
  components: {
    ChardCard
  },
  data() {
    return {
      chars: [],
      char: [],
      id: null,
      search: ""
    };
  },
  methods: {
    searchChar(id) {
      api.getChar(id).then(response => (this.char = response.data));
    }
  },
  computed: {
    filteredChars() {
      //SI SEARCH ESTÁ VACÍO
      if (!this.search) {
        return this.chars;
      }
      //SI SEARCH TIENE ALGO
      return this.chars.filter(
        char =>
          char.name.toLowerCase().includes(this.search.toLowerCase()) ||
          char.gender.toLowerCase().includes(this.search.toLowerCase()) ||
          char.status.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  created() {
    api.getAll().then(response => (this.chars = response.data.results));
  }
};
</script>
<!-- ESTILOS-->
<style scoped>
figure {
  display: block;
  margin: 0 auto;
}
h2 {
  font-size: 60px;
  color: rgb(57, 241, 11);
  font-family: sans-serif;
  -webkit-text-stroke: 1px black;
}
label {
  color: #1db2d3;
  font-weight: bold;
}
button {
  color: #1db2d3;
  font-weight: bold;
  background-color: chartreuse;
}
input {
  background-color: chartreuse;
}
</style>


