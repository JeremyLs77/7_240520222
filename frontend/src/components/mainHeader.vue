<template>
    <div class="header">
        <div class="header__image">
            <img  class="header__image--logo" src="../assets/icon-above-font_resized.png" alt="logo groupomania">
        </div>
        <div class="header__navigation">
                <router-link to="/" class="header__navitems">Accueil</router-link>
                <router-link to="/about" class="header__navitems">Forum</router-link>
                <a to="/login" class="header__navitems" v-on:click="Logout()">Déconnexion</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "mainHeader",
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

.header__navitems{
    margin : 5px 5px 5px 5px;
    font-size: 1.2em;
}
@media all and (max-width: 1024px){
    .header{
        &__liste{
            &--lien{
                font-size: 20px;
            }
        }
    }
}
@media all and (max-width: 727px){
    .header{
        &__liste{
            &--lien{
                font-size: 10px;
            }
        }
    }
}
</style>