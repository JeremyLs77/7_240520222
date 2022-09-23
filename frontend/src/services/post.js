import api from "../services/api";

export default {

    getPosts() {
        return api().get("message/getallmessages");
      },

    createPost(data) {
        return api().post("message/create", data);
      },
    
    };