<template>
  <div class ="profil">
    <h1>Profil</h1>

    <p>Numéro d'identifiant utilisateur: {{this.uti_id}}</p>

    <p>Adresse e-mail: {{this.email}}</p>

    <p>Nom : {{this.nom}}</p>

    <p>Prenom : {{this.prenom}}</p>

    <p>Statut utilisateur : {{this.status}}</p>

    <button @keyup.enter="suppr" type="submit" @click="suppr" class="btndelete">
    Supprimer mon compte
    </button>
  </div>

  <div class="modifyprofil">
    <p>Fonctionnalité de mise a jour des informations utilisateurs disponible dans une prochaine version de l'application.</p>
  </div>
</template>


<script>
import {connectedClient} from "../services/api.js";

export default {
    name: "mainProfile",
    data() {
        return {
        email: "",
        password: "",
        error: "",
        nom :"",
        prenom: "",
        }
    },

mounted() {
  if (localStorage.groupomaniaUser == undefined) {
    window.alert("Veuillez vous authentifier pour accéder a la page Profil");
    this.$router.push("/");
  } else {
    this.uti_id = JSON.parse(localStorage.groupomaniaUser).uti_id;
    this.email = JSON.parse(localStorage.groupomaniaUser).email;
    this.nom = JSON.parse(localStorage.groupomaniaUser).nom;
    this.prenom = JSON.parse(localStorage.groupomaniaUser).prenom;
    this.status = JSON.parse(localStorage.groupomaniaUser).status;
    }
  
},

methods: {
 //Fonction de suppression
    suppr() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      const uti_id = JSON.parse(localStorage.groupomaniaUser).uti_id;
      //const status = localstorage.getItem("status");
      //const user = {
        //email: this.email,
        //password: this.password,
      //};
      console.log(uti_id);
      if(confirm('Voulez vous vraiment supprimer le compte ?')){
      connectedClient.post("user/deleteUser/"+uti_id, {
        headers: {
         "Content-Type": 'application/x-www-form-urlencoded',
         authorization: "Bearer" + token,
         },
         })
        .then((res) => {
          if (res.status === 200) {
            window.alert("Le compte utilisateur a bien été supprimé. Redirection vers l'écran de connexion.")
            this.$router.push("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            window.alert("Seul le propriétaire du compte peut le supprimer");
          } 
            if (err.response.status === 400) {
            window.alert("Erreur");
          } 
        });
      }
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