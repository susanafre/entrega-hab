<template>
  <div class="coders">
    <div class="profile" v-for="(coder,index) in coders" :key="coder.id">
      <h1 class="name">{{coder.name}} {{coder.surname}}</h1>

      <div class="columna2">
        <div class="active" v-if="(coder.active === 0)">
          <p>CUENTA NO ACTIVADA</p>
          <button @click="activateAccountEvent(index)">ACTIVAR CUENTA</button>
        </div>

        <h2>* Datos personales *</h2>
        <p>
          <b>EMAIL:</b>
          {{coder.email}}
        </p>

        <p>
          <b>TELÉFONO:</b>
          {{coder.phone_number}}
        </p>

        <p>
          <b>PROVINCIA:</b>
          {{coder.province}}
        </p>

        <p>
          <b>FECHA DE ALTA:</b>
          {{coder.creation_date | moment("YYYY-M-D")}}
        </p>

        <h2>* Datos técnicos *</h2>

        <p>
          <b>ARCHITECTURE:</b>
          {{coder.architecture}}
        </p>

        <p>
          <b>LENGUAJE:</b>
          {{coder.language}}
        </p>

        <p>
          <b>TECHNOLOGY:</b>
          {{coder.technology}}
        </p>
      </div>
      <div class="buttons">
        <button @click="editProfileEvent(index)">EDITAR PERFIL</button>
        <button class="delete" @click="deleteProfileEvent(index)">ELIMINAR PERFIL</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCodersCard",
  props: {
    coders: Array
  },
  methods: {
    activateAccountEvent(index) {
      let data = this.coders[index];
      this.$emit("activar", data);
    },
    editProfileEvent(index) {
      let data = this.coders[index];
      this.$emit("editar", data);
    },
    deleteProfileEvent(index) {
      let data = this.coders[index];
      this.$emit("borrar", data);
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "serif";
  src: url("../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../assets/Ubuntu-Regular.ttf");
}
@keyframes aparition {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
button {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;

  font-weight: bold;
}
button:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.coders {
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 50% 50%);
  align-items: center;
  justify-items: center;
}
.profile {
  align-items: center;
  animation-duration: 2s;
  animation-name: aparition;
  font-family: "sansSerif";
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  margin: 1rem;
  display: grid;
  border-radius: 0.5rem;
  width: 600px;
  grid-gap: 1rem;
  grid-template-columns: repeat(1, 100%);
  grid-template-rows: repeat(3, 30% 30% 30%);
}
.delete {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  border-radius: 5px;
  padding: 0.3rem;
  margin: 1rem;
}
.delete:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
.name {
  text-decoration: underline;
}
h2 {
  margin: 2rem;
}
.active {
  margin: 1rem;
  padding: 1rem;
}
.active > p {
  color: red;
  font-weight: bold;
}
.buttons {
  margin-top: 3rem;
}
</style>