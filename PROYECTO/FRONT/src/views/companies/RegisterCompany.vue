<template>
  <div class="registercompany">
    <vue-headful title="Registro empresa" description="Página de registro para empresas" />

    <MenuPrincipal v-on:modalcoder="openModalLogCoder" v-on:modalcompany="openModalLogCompany"></MenuPrincipal>

    <header>
      <h1>PÁGINA DE REGISTRO PARA COMPAÑÍAS</h1>
    </header>

    <div class="companies">
      <h2>Datos de acceso a FI.Coder</h2>

      <div class="register">
        <div>
          <!-- NOMBRE -->

          <label for="name">Introduce el nombre de la empresa</label>
          <p>
            <input
              type="text"
              name="name"
              placeholder="Introduce el nombre de tu empresa"
              v-model="name"
            />
          </p>

          <!-- EMAIL -->
          <label for="email">Introduce el email</label>
          <p>
            <input
              type="text"
              name="email"
              placeholder="Introduce el correo electrónico"
              v-model="email"
            />
          </p>
          <!-- CONTRASEÑA -->

          <label for="password">Crea tu contraseña</label>
          <p>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              v-model="password"
            />
          </p>

          <!-- REPETIR CONTRASEÑA -->

          <label for="password">Repite la contraseña contraseña</label>
          <p>
            <input type="password" name="password" placeholder="Repite la contraseña" />
          </p>
        </div>

        <div>
          <!-- DESCRIPCIÓN -->

          <label for="description">Descripción de la empresa</label>
          <p>
            <textarea
              name="description"
              placeholder="Mínimo 20 caracteres"
              id="description"
              cols="30"
              rows="10"
              v-model="description"
            ></textarea>
          </p>
          <!-- PROVINCIA -->

          <label for="province">Introduce la provincia</label>
          <p>
            <input
              type="text"
              name="province"
              placeholder="Introduce la provincia"
              v-model="province"
            />
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
        </div>
      </div>

      <div class="botones">
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
            )"
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
  name: "RegisterCompany",
  components: {
    MenuPrincipal,
    FooterCustom
  },
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
            console.log(response);
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

        location.reload();
        this.$router.push("/home-coder");

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
.registercompany {
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
  width: 100%;
}
.companies {
  background: #27496d;
  color: #dae1e7;
  margin: 2.1% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  height: 65%;
  background-size: 25%;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
/* Botones */
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
textarea {
  border: 1.5px solid #27496d;
}
.register {
  display: grid;
  grid-template-columns: repeat(2, 50% 50%);
  align-items: center;
}
.botones {
  margin-top: 2rem;
  display: inline-flex;
}
</style>
