<template>
  <div class="options">
    <h1>¿Que puedes encontrar aquí?</h1>

    <td class="options" v-for="option in options" :key="option.id">
      <tr>
        <img class="imagen" :src="require(`@/assets/${option.icono}`)" />
      </tr>

      <tr class="titulo">
        <p>{{option.titulo}}</p>
      </tr>

      <tr class="cuerpo">
        <p>{{option.cuerpo}}</p>
      </tr>
    </td>
  </div>
</template>

<script>
export default {
  name: "ShowOptions",
  props: {
    options: Array
  }
};
</script>

<style scoped>
/* TABLA */
h1 {
  font-family: "serif";
  text-decoration: underline;
}
.options {
  margin: 1rem;
}
td {
  width: 600px;
  display: inline-block;
  margin: 0 auto;
}
.titulo {
  font-family: "serif";
  font-weight: bold;
}
</style>