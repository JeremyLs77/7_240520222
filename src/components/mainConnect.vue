<template>
    <div class="connexion">
        <div class="connexion__signupwrapper">
            <h2>Nouvel utilisateur</h2>
            <input type="text" placeholder="Adresse e-mail">
            <input type="text" placeholder="Mot de passe">
            <button class="btnlogin" type="submit">S'inscrire</button>
        </div>
        <div class="connexion__loginwrapper">
            <h2>Utilisateur existant</h2>
            <input type="text" placeholder="Adresse e-mail">
            <input type="text" placeholder="Mot de passe">
            <button class="btnlogin">Se connecter</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "mainConnect",
};
</script>

<style scoped lang="scss">
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