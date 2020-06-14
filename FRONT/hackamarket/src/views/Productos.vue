<template>
  <div class="paginaproductos">
    <!-- USAMOS VUE-HEADFUL PARA EL NOMBRE DE LAS PÁGINAS -->

    <vue-headful title="Products Page" description="Products page of the market" />

    <!-- AÑADIMOS EL COMPONENTE MENUCUSTOM -->

    <MenuCustom v-on:deslogarse="logoutUser"></MenuCustom>

    <!-- TÍTULO DE PRODUCTOS -->

    <h1>💮 CATÁLOGO DE PRODUCTOS 💮</h1>

    <!-- V-FOR QUE MUESTRA EL ARRAY DE PRODUCTOS -->

    <div class="productos" v-for="producto in productos" :key="producto.id">
      <!-- NOMBRE -->

      <h2>
        <p class="name">NOMBRE: {{ producto.nombre }}</p>
      </h2>

      <!-- DESCRIPCIÓN -->

      <h3>
        <p>DESCRIPCIÓN: {{ producto.descripcion }}</p>
      </h3>

      <!-- ESTADO -->
      <!-- Añadimos un class que en caso de que no exista stock, nos mostrará en rojo la disponibilidad -->

      <p
        :class="{ red: producto.stock === 0, green: producto.stock !== 0 }"
      >ESTADO: {{ producto.estado }}</p>

      <!-- IMÁGENES -->

      <p>
        <img :src="producto.img" />
      </p>

      <!-- PRECIO -->

      <p class="precio">PRECIO: {{ producto.precio }}</p>

      <!-- STOCK -->

      <P>STOCK: {{ producto.stock }}</P>

      <!-- BOTÓN DE COMPRA -->

      <button @click="showAlert()">COMPRAR</button>
    </div>

    <!-- AÑADIMOS EL COMPONENTE FOOTERCUSTOM -->

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS AXIOS, LOS COMPONENTES DE FOOTER Y MENU Y LA FUNCIÓN DE LIMPIAR LOGIN */
import axios from "axios";
import { clearLogin } from "../api/utils";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "Productos",
  components: {
    MenuCustom,
    FooterCustom
  },
  data() {
    return {
      productos: []
    };
  },
  methods: {
    //FUNCION QUE RECOGE LOS PRODUCTOS
    showProducts() {
      var self = this;
      axios
        .get("http://localhost:3050/productos")
        //SI SALE BIEN
        .then(function(response) {
          console.log(response);
          self.productos = response.data;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    },
    showAlert() {
      Swal.fire("Se ha añadido el artículo al carrito");
    }
  },
  created() {
    this.showProducts();
  }
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "dancing";
  src: url("../assets/DancingScript-VariableFont_wght.ttf");
}
.paginaproductos {
  font-family: "dancing";
  color: #d098c5;
  background-image: url("../assets/fondo.jpg");
}
.productos {
  border: 2px dotted #d098c5;
  width: 40%;
  margin: 1rem auto;
  padding: 1rem;
  background-color: white;
  text-align: center;
  font-weight: bold;
}
h1 {
  text-align: center;
  font-size: 40px;
  background-color: white;
  padding: 1rem;
  width: 40%;
  margin: 0 auto;
}
.name {
  text-decoration: underline;
}
.precio {
  background-color: #d098c5;
  color: #f7f1f6;
  width: 30%;
  margin: 0 auto;
  font-size: 30px;
  padding: 1rem;
}
button {
  background-color: #f7f1f6;
  border-radius: 1rem;
  border: 1px solid #bf29a6;
  padding: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #d098c5;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>
