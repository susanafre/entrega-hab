<template>
  <div class="coders">
    <div class="profilecoder" v-for="(coder) in coders" :key="coder.id">
      <p>NOMBRE: {{coder.name}}</p>
      <p>APELLIDOS: {{coder.surname}}</p>
      <p>EMAIL: {{coder.email}}</p>
      <p>ARCHITECTURE: {{coder.architecture}}</p>
      <p>TELÉFONO: {{coder.phone_number}}</p>
      <p>PROVINCIA: {{coder.province}}</p>
      <p>ID: {{coder.id}}</p>
    </div>
    <button @click="getCoderEvent(index)">VER PERFIL</button>
  </div>
</template>

<script>
export default {
  name: "CodersCard",
  props: {
    coders: Array
  },
  methods: {
    getCoderEvent(index) {
      let data = this.coders[index];
      this.$emit("obtener", data);
    }
  }
};
</script>

<style scoped>
</style>