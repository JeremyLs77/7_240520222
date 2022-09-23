import axios from 'axios'

const commonConfig = {                          // mise en place de l'URL des requêtes
    publicPath: process.env.VUE_APP_URL,
}

const notConnectedClient = axios.create({...commonConfig }) // création d'une méthode notConnectedClient
const connectedClient = axios.create({...commonConfig })    // création d'une méthode connectedClient

connectedClient.interceptors.request.use(function(config) {         // intercepteurs axios pour introduire le header d'authentification
    const token = JSON.parse(localStorage.groupomaniaUser).token
    config.headers = { Authorization: `Bearer ${token}` }
    return config;
});

export {
    connectedClient,
    notConnectedClient,
}