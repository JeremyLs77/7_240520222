<template>
    <h1>Forum</h1>

        <div class="form">
          <form v-on:submit.prevent>
            <div class="form-group">  
              <input
                type="text"
                class="form-control mb-2"
                id="text"
                aria-describedby="emailHelp"
                placeholder="Contribuez ici"
              />
            </div>
            <div class="form__input">
              <input
                @change="upload2"
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
              />
              <button class="publier btn btn-primary">
                Publier
              </button>
            </div>
          </form>
        </div>
</template>

<script>
//import {connectedClient} from "../services/api.js";

export default {
    name: "mainForum",
};

//methods: {
  //getPosts(){
    //connectedClient.get("/message/getallmessages"),
    //.then((res => {
          //console.log(res);
        //}),
      //}
    //},
  //}
//}
</script>

<style lang="scss" scoped>
.form{
    display:flex;
    justify-content: center;
    align-items: center;
    }

h1{
display: flex;
justify-content:center;
}
</style>