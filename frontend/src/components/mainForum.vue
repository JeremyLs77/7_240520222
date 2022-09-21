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
          @change="onFileChange"
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg, image/gif"
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
        <div v-for="object in post" :key="object.id" class="publication-single">
          <img class="postimg" :src="'http://localhost:3000/tmp/' + object.image " alt="image">
          <p class="posttitre"> {{ object.titre }} </p>
          <p class="posttexte"> {{ object.texte }} </p>
          <p class="postdesc"> Publié par {{object.auteur}} le {{object.date_creation}} </p>
          <button v-if="admin" class="btndelete" @click="deletePost(object.post_id)">Supprimer post_id : {{object.post_id}}</button>
        </div>
      </div>
    </div>
  </div>
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
      post_id: "",
      image: "",
      nom: "",
      prenom: "",
      email: "",
      uti_id: "",
      auteur: "",
      gifFile: "",
      status: "",
      admin: "",
    };
  },

  created() {
    this.connectedUser();
  },

  mounted() {
    this.getMessages();

    if (localStorage.groupomaniaUser) {
    this.auteur = JSON.parse(localStorage.groupomaniaUser).prenom;
    this.status = JSON.parse(localStorage.groupomaniaUser).status;
    console.log(this.status);
    }

    if (this.status == "admin") {
      this.admin="true";
      }

},

  methods: {
  createPost() {
    console.log(this.gifFile);
    let formData = new FormData();
    formData.append("texte", this.postText);
    formData.append("titre", this.postTitre);
    formData.append("auteur", this.auteur);
    formData.append("image", this.gifFile);
      connectedClient.post("message/create", formData, {
        headers: {
         "Content-Type": 'multipart/form-data',
         },
         })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          window.alert("Publication ajoutée.");
          location.reload;
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Erreur");
          window.alert("Erreur. La publication n'a pas pu être ajoutée. ");
        }
      });
  },

    deletePost(post_id) {
      let token = JSON.parse(localStorage.groupomaniaUser).token;
      connectedClient.post("message/deleteMessage/"+post_id, {
        headers: {
         "Content-Type": 'application/x-www-form-urlencoded',
        authorization: "Bearer" + token,
         },
        })
      .then((res) => {
        if (res.status === 200) {
          window.alert("Le post a bien été supprimé.")
          location.reload;
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          window.alert("Erreur");
        }
      })  
    },

    onFileChange: function(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.gifFile = reader.result
      }
    },

    connectedUser() {
      // Vérification que l'utilisateur est bien connecté
      if (localStorage.groupomaniaUser == undefined) {
        this.approuvedConnexion = false;
        window.alert("Veuillez vous authentifier pour accéder à l'espace de discussion.");
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 6rem;
}

.post-card {
  width: 60%;
  background: white;
  margin: 1rem 0;
  border: 6px solid red;
}

.publication{
margin: 1rem 1rem 1rem 1rem;
}

.publication-single{
margin: 8px 8px 8px 8px;
border: 1px solid black;
border-radius: 1rem;
}

.postdesc{
font-size: 0.7em;
}

.posttitre{
font-size: 1.2em;
font-weight: bold;
}

.postimg{
max-height: 16rem;
max-width: 40%;
margin: 0.3rem 0.3rem 0.3rem 0.3rem;
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
