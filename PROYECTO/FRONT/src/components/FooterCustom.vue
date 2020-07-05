<template>
  <div class="footer">
    <div class="text">© Susana Fraga Rego</div>
    <div class="nav">
      <a href="https://www.facebook.com/susana.fraga.5/">
        <img :src="require('../assets/logo_facebook.jpg')" alt="logo facebook" />
      </a>
      <a href="https://www.linkedin.com/in/susanafragasoporte/">
        <img :src="require('../assets/logo_linkedin.png')" alt="logo facebook" />
      </a>
      <a href="https://github.com/susanafre/entrega-hab">
        <img :src="require('../assets/logo_github.png')" alt="logo facebook" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterCustom"
};
</script>

<style scoped>
.footer {
  background-color: #00909e;
  opacity: 0.8;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #dae1e7;
}
.text {
  margin-top: 1.4rem;
}
img {
  width: 40px;
  height: 40px;
  margin: 0.5rem;
}
</style>
