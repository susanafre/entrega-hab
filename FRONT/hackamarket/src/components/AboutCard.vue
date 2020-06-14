<template>
  <!-- CUERPO DEL ABOUT -->

  <div class="about">
    <!-- TÍTULO DEL ABOUT -->

    <h1>
      💮 Este proyecto ha sido creado por
      <a
        href="https://www.linkedin.com/in/susanafragasoporte/"
      >Susana Fraga Rego</a>
      💮
      <img src="../assets/emoji.gif" alt="emoji" />
    </h1>

    <p>
      Se ha usado la
      <a href="https://www.npmjs.com/package/axios">librería Axios,</a>

      <a href="https://www.npmjs.com/package/jsonwebtoken">Jsonwebtoken,</a>

      <a href="https://github.com/auth0/jwt-decode">Jwt-decode,</a>

      <a href="https://www.npmjs.com/package/mysql">Mysql,</a>

      <a href="https://expressjs.com/es/">Express,</a>

      <a href="https://sweetalert2.github.io/">SweetAlert2,</a>

      <a href="https://www.npmjs.com/package/nodemon">Nodemon,</a>

      <a href="https://expressjs.com/en/resources/middleware/cors.html">Cors,</a>

      <a href="https://www.npmjs.com/package/body-parser">Body-parser.</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutCard"
};
</script>

<style scoped>
/* DIV CONTENIDO */

.about {
  background-color: white;
  margin: 0 auto;
  width: 50%;
  text-align: center;
}

/* P/A/H1 */

p {
  font-size: 2rem;
}
a {
  text-decoration: none;
  color: #d098c5;
}
h1 {
  padding: 1rem;
}
</style>