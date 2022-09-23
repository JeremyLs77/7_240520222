import {connectedClient} from "../services/api";

export default {

//login(data) {
    //return api().post("user/login", data);
//},

//signup(data) {
    //return api().post("user/signup", data);
//},

deleteAccount(id) {
    return connectedClient().delete("user/deleteUser/" + id);
},


};