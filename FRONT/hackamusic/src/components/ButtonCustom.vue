<template>
  <div>
    <!-- Creamos el botón con el que se podrán subscribir a la newsletter -->
    <button @click="buttonevent">Suscríbete a nuestra newsletter!!</button>
  </div>
</template>

<script>
export default {
  name: "ButtonCustom",
  methods: {
    /* se emite el evento que llamará a subscribeButton() en /Home*/
    buttonevent() {
      this.$emit("subscribeButton");
    }
  },
  props: {
    button: String
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}
button {
  font-family: "Love Ya Like A Sister";
  border-radius: 20px;
  font-size: 20px;
  padding: 1rem;
  background-color: #ffff66;
}
</style>

