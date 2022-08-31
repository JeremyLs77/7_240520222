<template>
    <div class="header">
        <div class="header__image">
            <img  class="header__image--logo" src="../assets/icon-above-font_resized.png" alt="logo groupomania">
        </div>
        <div class="header__navigation">
                <router-link to="/" class="header__navitems">Accueil</router-link>
                <router-link to="/profile" class="header__navitems">Profil</router-link>
                <button class="logout" @click="Logout()">Déconnexion</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "mainHeader",


methods: {
    Logout() {
        if (localStorage.groupomaniaUser == undefined) {
            window.alert("Vous n'etes pas connecté.");
        } else {
            localStorage.clear();
            window.alert("Déconnexion réussie. Redirection vers l'espace d'authentification.");
            this.$router.push("/");
        }
        }
    },
};
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding-bottom: 4rem;
    padding: 0;
    &__logo{
        max-width: 40%;
        max-height: 33%;
    }
}

.logout{
    margin-left : 5px;
}

.header__navitems{
    margin : 5px 5px 5px 5px;
    font-size: 1.2em;
}
@media all and (max-width: 1024px){
    .header{
    &__image{
    max-width: 50%;
    }
        &__image--logo{
        width: 90%;
        height: 90%;
            }
    }

    .header__navitems{
    margin : 1px 1px 1px 1px;
    font-size: 0.9em;
}
}
@media all and (max-width: 727px){
    .header{
        &__image{
    max-width: 50%;
    }
        &__image--logo{
        width: 90%;
        height: 90%;
            }
    }
}
    .header__navitems{
    margin : 1px 1px 1px 1px;
    font-size: 0.9em;
}

</style>