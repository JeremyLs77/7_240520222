<template>
  <h1>Forum</h1>

  <div class="form">
    <form>
      <div class="form-group">
        <input type="text" class="postTitre" v-model="postTitre" id="text" aria-describedby="emailHelp" placeholder="Titre" />
      </div>
      <div class="form-group">
        <input type="text" class="postText" v-model="postText" id="text" aria-describedby="emailHelp" placeholder="Contribuez ici" />
      </div>
      <div class="form__input">
        <input
          @change="upload2"
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          />
      </div>
      <button @keyup.enter="createPost" type="submit" @click="createPost" class="btndelete">Publier</button>
    </form>
  </div>
  <div v-if="posts.length === 0" class="container-button mx-auto mt-6 mb-15" elevation="24" width="700">
    <div class="mt-15 mb-15 mx-auto text-h4 text-center">Aucune publication trouvée...</div>
  </div>
  <div class="posts-container">
    <div v-for="post in posts" :key="post.post_id" class="post-card">
      <div class="publication-content">
        <div v-for="object in post" :key="object.id" class="publication">{{ object.titre }} {{ object.texte }}
          <p class="postdesc"> Publié par {{object.auteur}} le </p>
        </div>
      </div>
    </div>
  </div>
  //<button-group  v-show="ShowDropdown">
    //<b-dropdown-item v-if="admin">Supprimer</b-dropdown-item>
  //</button-group>
</template>

<script>
import { connectedClient } from "../services/api.js";

export default {
  name: "mainForum",

  data() {
    return {
      posts: [],
      postText: "",
      postTitre: "",
      nom: "",
      prenom: "",
      email: "",
      uti_id: "",
      auteur: "",
    };
  },

  created() {
    this.connectedUser();
  },

  mounted() {
    this.getMessages();

    if (localStorage.groupomaniaUser) {
    this.auteur = JSON.parse(localStorage.groupomaniaUser).prenom;
    }
},

  methods: {
  createPost() {
    console.log(this.postText);
    let formData = new FormData();
    formData.append("texte", this.postText);
    formData.append("titre", this.postTitre);
    formData.append("auteur", this.auteur);
      connectedClient.post("message/create", formData, {
        headers: {
         "Content-Type": 'multipart/form-data',
         },
         })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Erreur");
        }
      });
  },

    connectedUser() {
      // Vérification que l'utilisateur est bien connecté
      if (localStorage.groupomaniaUser == undefined) {
        this.approuvedConnexion = false;
        console.log("Utilisateur non connecté !");
        this.$router.push("/");
      } else {
        this.approuvedConnexion = true;
        this.nom = JSON.parse(localStorage.groupomaniaUser).nom
        this.prenom = JSON.parse(localStorage.groupomaniaUser).prenom
        console.log("Utilisateur connecté !");
      }
    },

    getMessages() {
      connectedClient.get(`message/getallmessages`).then((res) => {
        this.posts = res.data;
        console.log(res.data);
      });
    },
  },

};

    //toggleDropdownButton() {
      //if (this.admin === true) {
        //this.ShowDropdown = !this.ShowDropdown;
      //}
    //},

</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  display: flex;
  justify-content: center;
}

.posts-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.post-card {
  position: relative;
  width: 50%;
  background: white;
  margin: 1rem 0;
  border-radius: 6px;
}

.publication{
margin: 1rem 1rem 1rem 1rem;
}

.postdesc{
font-size: 0.7em;
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
    margin-top : 0.5rem;
    box-shadow: 2px 2px 5px -3px rgba(0,0,0,0.7);
    cursor: pointer;
}
</style>
