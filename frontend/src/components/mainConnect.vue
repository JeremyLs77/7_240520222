<template>
  <div class="card">
   
    <h1 class="card__title">Connexion</h1>
    <p class="card__subtitle">
      Vous n'avez pas encore de compte ?
      <router-link to="/Signup"><i class="fas fa-sign-in-alt p-2"></i>S'inscrire</router-link>
    </p>
    <label for="email-adress">Adresse email *</label>
    <div class="form-row">
      <input
        v-model="email"
        class="form-row__input"
        
        type="email"
        required
        @keyup.enter="login"
        placeholder="Adresse mail"
      />
    </div>
    <label for="password">Mot de passe *</label>
    <div class="form-row">
      <input
       
        v-model="password"
        type="password"
        required
        @keyup.enter="login"
        class="form-row__input"
        placeholder="Mot de passe"
      />
    </div>

    <div class="form-row">
      <button class="btnlogin" type="submit" @click="login">
        <span><i class="fas fa-sign-in-alt p-4"></i>Connexion</span>
      </button>
    </div>
  </div>
</template>

<script>
import {notConnectedClient} from "../services/api.js";

export default {
  name: "mainConnect",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      message: "",
    };
  },
  methods: {
    //Fonction de connexion
    login() {
      const email = this.email;
      const password = this.password;
       notConnectedClient.post("/user/login", {
              email,
              password
          })
        .then((res) => {
          if (res.status === 200) {
                const groupomaniaUser = {
                    token: res.data.token,
                    uti_id: res.data.uti_id,
                    status: res.data.status,
                    prenom: res.data.prenom,
                    nom: res.data.nom,
                    email: res.data.email
                }
                localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));
                window.alert("Connexion réussie. Redirection vers l'espace de discussion");
                this.$router.push("/about");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            window.alert("Vous devez renseigner tous les champs");
            location.reload();
          } else if (err.response.status === 401) {
            window.alert("Veuillez entrer un format e-mail et/ou mot de passe valide");
            location.reload();
            }
        });
    },
  },
};

//import router from "../router/index";
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
.identification-box {
  background-color: #3b2cc2;
}
.icon-name {
  height: 250px;
}
h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.4em;
}
.submit-button {
  background-color: #3b2cc2;
  color: black;
  border: solid 1px black1;
}
.submit-button:hover {
  background: #3b2cc2;
}
.messageError {
  color: black1;
}
.input {
  width: 20em;
}
.input:hover {
  outline: none !important;
  border: solid 1px black1;
  box-shadow: 0 0 10px #3b2cc2;
}
.switch-page {
  line-height: 50px;
}
@media screen and (max-width: 870px) {
  .icon-name {
    height: 200px;
  }
  h1 {
    font-size: 1.2em;
  }
  h2 {
    font-size: 1.3em;
  }
  .input {
    width: 18em;
  }
}
@media screen and (max-width: 560px) {
  .icon-name {
    height: 150px;
  }
  h1 {
    display: 1em;
  }
  h2 {
    font-size: 1.2em;
  }
  .input {
    width: 17em;
  }
  .switch-page {
    line-height: 30px;
  }
}
@media screen and (max-width: 440px) {
  h1 {
    display: none;
  }
  .input {
    width: 15em;
  }
}
.btnlogin{
    background-color: rgb(105, 105, 105);
    background: rgba(200,20,20,1);
    border: 0px;
    color: white;
    position: relative;
    z-index: 1;
    border-radius: 0.3rem;
    padding: 0.5rem 1.0rem 0.5rem 1.0rem;
    margin-bottom: 2rem;
    box-shadow: 2px 2px 5px -3px rgba(0,0,0,0.7);
    cursor: pointer;
}
</style>