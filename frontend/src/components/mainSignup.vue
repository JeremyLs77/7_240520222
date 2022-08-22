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

    <div class="form-row">
      <button @keyup.enter="signup" type="submit" @click="signup" class="btnlogin">
        <span>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
import auth from "../services/auth.js";

export default {
  name: "mainSignup",
  data() {
    return {
      email: "",
      password: "",
      show: true,
      error: "",
      emailRegex:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
    };
  },
  methods: {
    //Fonction d'inscription
    signup() {
      let newUser = {
        email: this.email,
        password: this.password,
      };
      if (!this.emailRegex.test(this.email)) {
        window.alert("Vous devez renseigner une adresse email valide");
        location.reload();
      } else if (!this.passwordRegex.test(this.password)) {
       window.alert("Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
       location.reload();
      }
      auth.signup(newUser)
        .then((res) => {
          if (res.status === 201) {
            auth.login(newUser) //login si inscription réussie
              .then((res) => {
                if (res.status === 200) {
                  localStorage.setItem("userLogin", JSON.stringify(res.data));
                  this.$router.push("/about");
                }
              })
              .catch(() => {
                localStorage.clear();
                this.error = "Veuillez renseigner un email et un mot de passe";
              });
          }
        })
    },
  },
};
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