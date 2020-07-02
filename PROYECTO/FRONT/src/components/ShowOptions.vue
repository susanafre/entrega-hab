<template>
  <div class="optionsmain">
    <h1>¿Quiénes somos?</h1>

    <td class="options" v-for="option in options" :key="option.id">
      <tr>
        <img class="imagen" :src="require(`@/assets/${option.icono}`)" />
      </tr>

      <tr class="titulo">
        <p>{{ option.titulo }}</p>
      </tr>

      <tr class="cuerpo">
        <p>{{ option.cuerpo }}</p>
      </tr>
    </td>
  </div>
</template>

<script>
export default {
  name: "ShowOptions",
  props: {
    options: Array,
  },
};
</script>

<style scoped>
/* TABLA */

h1 {
  font-family: "serif";
  text-decoration: underline;
}
.options {
  margin: 3rem;
  display: inline-block;
}
td {
  width: 40%;
  height: 40%;
  text-align: center;
  margin: 2rem;
}
.titulo {
  font-family: "serif";
  font-weight: bold;
}
.cuerpo {
  text-align: justify;
}
</style>
