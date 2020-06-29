<template>
  <div class="registercompany">
    <vue-headful title="Registro empresa" description="Página de registro para empresas" />

    <header>
      <h1>PÁGINA DE REGISTRO PARA COMPAÑÍAS</h1>
    </header>

    <div class="companies">
      <h2>Datos de acceso a FI.Coder</h2>

      <!-- EMAIL -->

      <label for="email">Introduce el email de la empresa</label>
      <p>
        <input type="text" name="email" v-model="email" />
      </p>
      <!-- CONTRASEÑA -->

      <label for="password">Crea tu contraseña</label>
      <p>
        <input type="password" name="password" placeholder="Mínimo 8 caracteres" v-model="password" />
      </p>
      <!-- NOMBRE -->

      <label for="name">Introduce el nombre de la empresa</label>
      <p>
        <input type="text" name="name" placeholder="Introduce tu nombre" v-model="name" />
      </p>
      <!-- DESCRIPCIÓN -->

      <label for="description">Descripción de la empresa</label>
      <p>
        <textarea
          name="description"
          placeholder="Mínimo 20 caracteres"
          id="description"
          cols="30"
          rows="10"
        ></textarea>
      </p>
      <!-- PROVINCIA -->

      <label for="province">Introduce la provincia</label>
      <p>
        <input type="text" name="province" v-model="province" />
      </p>
      <!-- TELÉFONO -->

      <label for="phone_number">Introduce el teléfono</label>
      <p>
        <input
          type="text"
          name="phone_number"
          placeholder="Mínimo 9 dígitos"
          v-model="phone_number"
        />
      </p>
      <!-- WEB -->

      <label for="web">Introduce la web de la empresa</label>

      <p>
        <input type="text" name="web" placeholder="http://www.nombreWeb.com" v-model="web" />
      </p>

      <p>
        <button
          class="register"
          @click="
            addCompany(
              name,
              description,
              province,
              phone_number,
              email,
              password,
              web
            )
          "
        >Registrar</button>
        <button class="cancel" @click="cancelButton()">Cancelar</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "RegisterCompany",
  data() {
    return {
      name: "",
      description: "",
      province: "",
      phone_number: "",
      email: "",
      password: "",
      web: "",
      correctData: false,
      required: false
    };
  },
  methods: {
    /* VALIDAMOS LOS DATOS INTRODUCIDOS */

    validatingData() {
      if (
        this.name === "" ||
        this.description === "" ||
        this.province === "" ||
        this.phone_number === "" ||
        this.email === "" ||
        this.password === "" ||
        this.web === ""
      ) {
        this.correctData = false; //NO ENVIAR
        this.required = true;
      } else {
        this.correctData = true; //SÍ ENVIAR
        this.required = false;
      }
    },

    /* ADDCLIENT */

    addCompany(
      name,
      description,
      province,
      phone_number,
      email,
      password,
      web
    ) {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData === true) {
        var self = this;
        axios
          .post("http://localhost:3000/companies", {
            name: self.name,
            description: self.description,
            province: self.province,
            phone_number: self.phone_number,
            email: self.email,
            password: self.password,
            web: self.web
          })
          .then(async function(response) {
            await Swal.fire(
              "Se ha creado el perfil. Revisa tu bandeja de correo y valida tu cuenta."
            );
            self.emptyFields(); /* VACIAR CAMPOS */
            self.$router.push("/"); /* ENVIAR A HOME */
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Algo ha ido mal!"
        });
      }
    },

    /* EMPTYFIELDS */

    emptyFields() {
      this.name = "";
      this.description = "";
      this.province = "";
      this.phone_number = "";
      this.email = "";
      this.password = "";
      this.web = "";
    },
    cancelButton() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "serif";
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
header {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
}
.registercompany {
  font-family: "sansSerif";
  background-image: url("https://images.unsplash.com/photo-1510511498717-4326639c999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  opacity: 0.9;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  /*  background: rgba(0, 0, 0, 0.5); */
  width: 100%;
}
.companies {
  background: #00909e;
  color: #dae1e7;
  margin: 1.1% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  background-size: 25%;
  border-radius: 1rem;
}
button {
  background: #27496d;
  color: #dae1e7;
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 3px;
}
h1 {
  font-family: "serif";
}
label {
  margin: 0;
}
input {
  box-shadow: 2px 2px #dae1e7;
  width: 300px;
}
textarea {
  border: 1.5px solid #27496d;
}
.cancel {
  background-color: #dae1e7;
  color: #27496d;
}
button:hover {
  background-color: #dae1e7;
  color: #00909e;
  font-size: 1rem;
}
</style>
