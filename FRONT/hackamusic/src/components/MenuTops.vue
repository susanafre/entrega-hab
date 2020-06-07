<template>
  <div>
    <div id="nav">
      <!-- ENLACE A LAS PÁGINAS SOLICITADAS MEDIANTE NAME -->
      <router-link :to="{ name: 'Toptracks' }">Top Tracks</router-link> ⭐

      <router-link :to="{ name: 'Topartists' }">Top Artists</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuTops",
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "Love Ya Like A Sister";
  src: url("../assets/LoveYaLikeASister-Regular.ttf");
}

div {
  background-color: rgb(51, 51, 53);
  text-align: center;
  margin: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #ffff66;
  font-weight: bold;
  text-decoration: none;
  font-size: 30px;
  font-family: "Love Ya Like A Sister";
}

#nav a.router-link-exact-active {
  color: #e66465;
}
</style>

/* 1. Se crea la estructura básica 2 .Se añade el div dentro de template, scoped
y añadimos el name 3. Se añaden los links 4. Añadimos estilos */
