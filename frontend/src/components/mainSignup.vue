<template>
  <div class="card">
    
    <h1 class="card__title" v-if='login'>Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if='Signup'>
      Vous n'avez pas pas encore de compte ?
    </p>
    <p class="card__subtitle" v-else>
      Vous avez déjà un compte ? <router-link to="/">Se connecter</router-link>
    </p>
    <label align="center" for="password">Adresse mail</label>
    <div class="form-row">
      <input
        
        class="form-row__input"
        v-model="email"
        type="email"
        maxlength="30"
        
        required
        placeholder="Entrez votre adresse email"
        @keyup.enter="signup"
      />
    </div>
    <label align="center" for="password">Mot de passe </label>
    <div class="form-row">
      <input
       
        class="form-row__input"
        v-model="password"
        type="password"
        maxlength="16"
        
        required
        placeholder="Entrez votre mot de passe"
        @keyup.enter="signup"
      />
    </div>
    <label align="center" for="nom">Nom</label>
    <div class="form-row">
      <input
       
        class="form-row__input"
        v-model="nom"
        type="nom"
        maxlength="16"
        
        required
        placeholder="Entrez votre nom"
        @keyup.enter="signup"
      />
    </div>
    <label align="center" for="nom">Prenom</label>
    <div class="form-row">
      <input
       
        class="form-row__input"
        v-model="prenom"
        type="prenom"
        maxlength="16"
        
        required
        placeholder="Entrez votre prenom"
        @keyup.enter="signup"
      />
    </div>

    <div class="form-row">
      <button @keyup.enter="signup" type="submit" @click="signup" class="btnlogin">
        <span>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
import {notConnectedClient} from "../services/api.js";

export default {
  name: "mainSignup",
  data() {
    return {
      email: "",
      password: "",
      nom: "",
      prenom: "",
      show: true,
      error: "",
      emailRegex:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
    };
  },
  methods: {
    //Fonction d'inscription
    signup() {
      const email = this.email;
      const password = this.password;
      const nom = this.nom;
      const prenom = this.prenom;
      //if (!this.emailRegex.test(this.email)) {
        //window.alert("Vous devez renseigner une adresse email valide");
        //location.reload();
      //} else if (!this.passwordRegex.test(this.password)) {
      // window.alert("Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
       //location.reload();
      //}
      notConnectedClient.post("/user/signup", {
              email,
              password,
              nom,
              prenom
          })
        .then((res) => {
          if (res.status === 201) {
            notConnectedClient.post("/user/login", {
              email,
              password
          }) //login en cas d'inscription réussie
              .then((res) => {
                if (res.status === 200) {
                const groupomaniaUser = {
                    token: res.data.token,
                    email: res.data.email,
                    uti_id: res.data.uti_id,
                    status: res.data.status,
                    prenom: res.data.prenom,
                    nom: res.data.nom
                }
                localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));
                  window.alert("Compte utilisateur crée. Redirection vers la page forum");
                  this.$router.push("/about");
                }
              })
              .catch(() => {
                localStorage.clear();
                this.error = "Veuillez renseigner un email et un mot de passe";
              });
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            window.alert("Vous devez renseigner tous les champs");
            location.reload();
          }
          if (err.response.status === 401) {
            window.alert("Veuillez entrer un format e-mail et/ou mot de passe valide (le mdp doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
            location.reload();
            }
        });
    },
  },
};
</script>

<style scoped>

.card {
margin-bottom: 7rem;
}
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
  font-size: 15px;
  flex: 1;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
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