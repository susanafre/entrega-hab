<template>
  <div class="registercoder">
    <vue-headful
      title="Registro desarrollador"
      description="Página de registro para desarrolladores"
    />

    <MenuPrincipal v-on:modalcoder="openModalLogCoder" v-on:modalcompany="openModalLogCompany"></MenuPrincipal>

    <header>
      <h1>PÁGINA DE REGISTRO PARA DESARROLLADORES</h1>
    </header>

    <div class="coders">
      <h2>Datos de acceso a FI.Coder</h2>
      <div class="register">
        <div>
          <!-- NOMBRE -->

          <label for="name">Introduce tu nombre</label>

          <p>
            <input
              class="inputdata"
              type="text"
              name="nombre"
              placeholder="Introduce tu nombre"
              v-model="name"
            />
          </p>

          <!-- APELLIDOS -->

          <label for="surname">Introduce tus apellidos</label>

          <p>
            <input
              class="inputdata"
              type="text"
              name="surname"
              placeholder="Introduce tus apellidos"
              v-model="surname"
            />
          </p>

          <!-- EMAIL -->
          <label for="email">Introduce tu email</label>

          <p>
            <input type="text" name="email" placeholder="Introduce tu email" v-model="email" />
          </p>

          <!-- CONTRASEÑA -->

          <label for="password">Crea una contraseña</label>

          <p>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              v-model="password"
            />
          </p>

          <!-- REPETIR CONTRASEÑA -->

          <label for="password">Repite la contraseña</label>

          <p>
            <input type="password" name="password" placeholder="Repite la contraseña" />
          </p>
        </div>

        <div>
          <!-- TELÉFONO -->

          <label for="phone">Introduce tu teléfono</label>

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
            <input
              type="text"
              name="province"
              placeholder="Introduce tu provincia"
              v-model="province"
            />
          </p>

          <!-- LENGUAJE -->

          <label for="language">Introduce lenguaje</label>

          <p>
            <input type="text" name="language" placeholder="Introduce lenguaje" v-model="language" />
          </p>

          <!-- TECNOLOGÍA -->

          <label for="technology">Introduce tecnología</label>

          <p>
            <input
              type="text"
              name="technology"
              placeholder="Introduce tecnología/s"
              v-model="technology"
            />
          </p>

          <!-- ARQUITECTURA -->

          <label for="architecture">Introduce arquitectura</label>

          <p>
            <input
              type="text"
              name="architecture"
              placeholder="Introduce arquitecturaa"
              v-model="architecture"
            />
          </p>
        </div>
      </div>
      <div class="botones">
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
      </div>
    </div>
    <!-- ######### LOGIN CODER ############ -->

    <!-- MODAL PARA LOGIN CODER -->

    <div v-show="modal" class="modal">
      <div class="modalBox">
        <h1>Inicia sesión</h1>

        <!-- INPUT PARA EMAIL Y CONTRASEÑA -->
        <label for="name">Correo electrónico</label>
        <p>
          <input type="text" name="email" placeholder="Introduce el email" v-model="email" />
        </p>
        <label for="password">Contraseña</label>
        <p>
          <input
            type="password"
            name="password"
            placeholder="Introduce la contraseña"
            v-model="password"
          />
        </p>

        <!-- BOTONES DE CERRAR EL MODAL Y DE HACER LOGIN -->

        <button class="logCoder" @click="logCoder()">Acceder</button>
        <button class="closelogCoder" @click="closeModal()">Cerrar</button>

        <!-- SI NO ESTÁ REGISTRADO, LLEVA AL ÁREA DE REGISTRO -->

        <p>
          ¿No estás registrado? Haz click
          <router-link to="/register-coder">AQUÍ</router-link>
        </p>
      </div>
    </div>

    <!-- ########### LOGIN COMPANY ############# -->

    <!-- MODAL PARA LOGIN COMPANY -->

    <div v-show="modallogincompany" class="modallogincompany">
      <div class="modalBox">
        <h1>Inicia sesión</h1>
        <label for="name">Correo electrónico</label>
        <p>
          <input type="text" name="email" placeholder="Introduce aquí tu email" v-model="email" />
        </p>

        <label for="password">Contraseña</label>
        <p>
          <input
            type="password"
            name="password"
            placeholder="Introduce aquí tu contraseña"
            v-model="password"
          />
        </p>

        <!-- ESTO HACE LOGIN O CIERRA EL MODAL -->

        <button class="login" @click="logCompany()">LOGIN</button>
        <button class="closelogin" @click="closeModalLogCompany()">CERRAR</button>

        <!-- SI NO ESTÁ REGISTRADO, LLEVA A LA VENTANA DE REGISTRO -->

        <h2>
          ¿No estás registrado? Haz click
          <router-link to="/register-company">AQUÍ</router-link>
        </h2>
      </div>
    </div>

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

import MenuPrincipal from "../../components/menus/MenuPrincipal";
/* Componente de Footer */
import FooterCustom from "@/components/FooterCustom.vue";

import { loginCoders } from "../../api/utils";
import { loginCompanies } from "../../api/utils";

export default {
  name: "RegisterCoder",
  components: {
    MenuPrincipal,
    FooterCustom
  },

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
      required: false,
      /* Variables para los modales */
      modal: false,
      modallogincompany: false,
      modalcompany: false
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
    },
    /* LOGIN PARA CODERS */
    /* LoginCoders.js */
    async logCoder() {
      try {
        //INTENTO HACER LOGIN
        await loginCoders(this.email, this.password);
        this.email = "";
        this.password = "";
        //location.reload();
        this.closeModal();
        this.$router.push("/home-coder");
        location.reload();

        //SI HAY LOGIN, QUE ME LLEVE AL HOME
      } catch (err) {
        alert(`Error: ${err}`);
      }
    },

    /* LOGIN PARA EMPRESAS */
    /* LoginCompanies.js */
    async logCompany() {
      try {
        //INTENTO HACER LOGIN
        await loginCompanies(this.email, this.password);
        this.email = "";
        this.password = "";
        location.reload();
        this.closeModalLogCompany();

        //SI HAY LOGIN, QUE ME LLEVE AL HOME
      } catch (err) {
        alert(`Error: ${err}`);
      }
    },
    /* FUNCIONES QUE ABREN Y CIERRAN MODALES */

    closeModal() {
      this.email = "";
      this.password = "";

      this.modal = false;
    },
    openModalLogCoder() {
      this.modal = true;
    },
    closeModalCompany() {
      this.modalcompany = false;
    },
    openModalCompany() {
      this.modalcompany = true;
    },
    openModalLogCompany() {
      this.modallogincompany = true;
    },
    closeModalLogCompany() {
      this.email = "";
      this.password = "";

      this.modallogincompany = false;
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
  color: #27496d;
}
.registercoder {
  font-family: "sansSerif";
  background-image: url("https://www.sosmatic.es/wp-content/uploads/2019/08/ilya-pavlov-wbXdGS_D17U-unsplash.jpg");
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
  background: #27496d;
  color: #dae1e7;
  margin: 4.6% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  height: 60%;
  background-size: 25%;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.register {
  display: grid;
  grid-template-columns: repeat(2, 50% 50%);
}
.botones {
  display: inline-flex;
  margin-top: 2rem;
}
/* Botones registro */
button {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
button:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.cancel {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  margin: 1rem;
}
.cancel:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
h1 {
  font-family: "serif";
}
label {
  margin: 0;
}
input {
  width: 300px;
  height: 30px;
  border-radius: 0.4rem;
  text-align: center;
}
::-webkit-input-placeholder {
  color: #27496d;
  text-align: center;
}
::placeholder {
  color: #27496d;
}
td {
  display: inline-block;
  margin-left: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modalBox {
  background: #27496d;
  color: #dae1e7;
  margin: 13% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  background-size: 25%;
}

.modalBox > h1 {
  font-family: "serif";
  font-size: 2rem;

  opacity: 0.9;
}
.logCoder {
  font-size: 1rem;
  border: 1px solid #dae1e7;
  box-shadow: 2px 2px #dae1e7;
}
.logCoder:hover {
  background-color: #dae1e7;
  color: #00909e;
}
.closelogCoder {
  background-color: #dae1e7;
  color: #00909e;
  font-size: 12px;
  border: 1px solid #27496d;
}
.closelogCoder:hover {
  background: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
.login {
  font-size: 1rem;
  box-shadow: 2px 2px #dae1e7;
}
.login:hover {
  background-color: #dae1e7;
  color: #00909e;
}
.closelogin {
  background-color: #dae1e7;
  color: #00909e;
  font-size: 12px;
  box-shadow: 2px 2px #27496d;
}
.closelogin:hover {
  background: #27496d;
  color: #dae1e7;
}
.modalcompany {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modallogincompany {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
</style>
