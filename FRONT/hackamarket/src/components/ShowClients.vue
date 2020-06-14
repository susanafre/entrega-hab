<template>
  <div class="pageclients">
    <div class="clientes" v-for="(cliente, index) in clientes" :key="cliente.id">
      <p>NOMBRE: {{ cliente.nombre }}</p>
      <p>APELLIDO: {{ cliente.apellido }}</p>
      <p>CIUDAD: {{ cliente.ciudad }}</p>
      <p>EMPRESA: {{ cliente.empresa }}</p>
      <button @click="editClientEvent(index)">EDITAR</button>
      <button @click="deleteClientEvent(index)">ELIMINAR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowClients",
  props: {
    clientes: Array
  },
  methods: {
    //FUNCIÓN QUE EMITE UN EVENTO PARA EDITARORRAR UN CLIENTE
    editClientEvent(index) {
      //Guardando la información de la nota
      //seleccionada
      let data = this.clientes[index];
      //Enviando la info de la nota a la vista
      this.$emit("editar", data);
    },
    //FUNCIÓN QUE EMITE UN EVENTO PARA BORRAR UN CLIENTE
    deleteClientEvent(index) {
      let data = this.clientes[index].id;
      this.$emit("borrar", data);
    }
  }
};
</script>

<style scoped>
/* ###  ESTILOS ### */

@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}
.pageclients {
  margin: 1rem;
}
.clientes {
  background-color: white;
  width: 20%;
  padding: 1rem;
  margin: 2rem auto;
  border: 2px solid #bf29a6;
  display: inline-block;
  margin-left: 2rem;
}
button {
  background-color: #f7f1f6;
  border-radius: 1rem;
  border: 1px solid #bf29a6;
  padding: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #d098c5;
  margin: 2rem;
}
</style>
