<template>
  <div class="registercoder">
    <vue-headful
      title="Registro desarrollador"
      description="Página de registro para desarrolladores"
    />
    <header>
      <h1>PÁGINA DE REGISTRO PARA DESARROLLADORES</h1>
    </header>
    <div class="coders">
      <h2>Datos de acceso a FI.Coder</h2>

      <!-- EMAIL -->

      <p>
        <label for="email">Introduce tu email</label>
      </p>
      <p>
        <input type="text" name="email" placeholder v-model="email" />
      </p>

      <!-- CONTRASEÑA -->

      <p>
        <label for="password">Crea una contraseña</label>
      </p>
      <p>
        <input type="password" name="password" placeholder="Mínimo 8 caracteres" v-model="password" />
      </p>
      <!-- NOMBRE -->
      <td>
        <tr>
          <p>
            <label for="name">Introduce tu nombre</label>
          </p>
        </tr>
        <tr>
          <p>
            <input class="inputdata" type="text" name="nombre" placeholder v-model="name" />
          </p>
        </tr>
      </td>
      <!-- APELLIDOS -->
      <td>
        <tr>
          <p>
            <label for="surname">Introduce tus apellidos</label>
          </p>
        </tr>

        <tr>
          <p>
            <input class="inputdata" type="text" name="surname" v-model="surname" />
          </p>
        </tr>
      </td>

      <!-- TELÉFONO -->

      <p>
        <label for="phone">Introduce tu teléfono</label>
      </p>
      <p>
        <input
          type="text"
          name="phone_number"
          placeholder="Mínimo 9 dígitos"
          v-model="phone_number"
        />
      </p>

      <!-- PROVINCIA -->

      <label for="province">Introduce tu provincia</label>

      <p>
        <input type="text" name="province" v-model="province" />
      </p>

      <!-- LENGUAJE -->

      <label for="language">Introduce lenguaje</label>

      <p>
        <input type="text" name="language" v-model="language" />
      </p>

      <!-- TECNOLOGÍA -->

      <label for="technology">Introduce tecnología</label>

      <p>
        <input type="text" name="technology" v-model="technology" />
      </p>

      <!-- ARQUITECTURA -->

      <label for="architecture">Introduce arquitectura</label>

      <p>
        <input type="text" name="architecture" v-model="architecture" />
      </p>

      <p>
        <button
          class="register"
          @click="
            addCoder(
              email,
              password,
              name,
              surname,
              phone_number,
              province,
              language,
              technology,
              architecture
            )
          "
        >Registrar</button>
        <button class="cancel" @click="cancelButton()">Cancelar</button>
      </p>
    </div>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "RegisterCoder",

  data() {
    return {
      email: "",
      password: "",
      name: "",
      surname: "",
      phone_number: "",
      province: "",
      language: "",
      technology: "",
      architecture: "",
      correctData: false,
      required: false
    };
  },

  methods: {
    /* VALIDAMOS LOS DATOS INTRODUCIDOS */

    validatingData() {
      if (
        this.email === "" ||
        this.password === "" ||
        this.name === "" ||
        this.surname === "" ||
        this.phone_number === "" ||
        this.province === "" ||
        this.language === "" ||
        this.technology === "" ||
        this.architecture === ""
      ) {
        this.correctData = false; //NO ENVIAR
        this.required = true;
      } else {
        this.correctData = true; //SÍ ENVIAR
        this.required = false;
      }
    },

    /* ADDCLIENT */

    addCoder(
      email,
      password,
      name,
      surname,
      phone_number,
      province,
      language,
      technology,
      architecture
    ) {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData === true) {
        let self = this;
        axios
          .post("http://localhost:3000/coders", {
            email: self.email,
            password: self.password,
            name: self.name,
            surname: self.surname,
            phone_number: self.phone_number,
            province: self.province,
            language: self.language,
            technology: self.technology,
            architecture: self.architecture
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
      this.email = "";
      this.password = "";
      this.name = "";
      this.surname = "";
      this.phone_number = "";
      this.province = "";
      this.language = "";
      this.technology = "";
      this.architecture = "";
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
  padding: 2rem;
}
.registercoder {
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
.coders {
  background: #00909e;
  color: #dae1e7;
  margin: 1.2% auto;
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
.cancel {
  background-color: #dae1e7;
  color: #27496d;
}
button:hover {
  background-color: #dae1e7;
  color: #00909e;
  font-size: 1rem;
}
td {
  display: inline-block;
  margin-left: 1rem;
}

.inputdata {
  width: 150px;
}
</style>
