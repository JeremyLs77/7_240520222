<template>
    <h1>Profil</h1>

    <p>Numéro d'identifiant utilisateur:</p>

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
    <button @keyup.enter="suppr" type="submit" @click="suppr" class="btndelete">
    Supprimer mon compte
    </button>
</template>


<script>
import Axios from "axios";
import proxy from "vue.config.js";

export default {
    name: "mainProfile",
    data() {
        return {
        email: "",
        password: "",
        error: "",
        }
    },


methods: {
 //Fonction de suppression
    suppr() {
      const user = {
        email: this.email,
        password: this.password,
      };
      Axios.delete("proxy/deleteUser", user)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
          }
        })
        .catch((err) => {
          localStorage.clear();
          if (err.response.status === 403) {
            window.alert("Seul le propriétaire du compte peut le supprimer");
          } 
            if (err.response.status === 400) {
            window.alert("Erreur");
          } 
        });
    },
  },
}

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
.btndelete{
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