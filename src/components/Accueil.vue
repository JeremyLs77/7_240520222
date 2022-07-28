<template>
  <div class="welcome">
        <div class="welcome__wrapper">
            <img class="welcome__logo" src="../assets/icon.png" alt="Groupomania"/>
            <h1 class="welcome__title">Réseau social Groupomania</h1>
        </div>
        <p class="welcome__text">Bienvenue sur l'espace communautaire Groupomania, réseau social interne d'entreprise. Veuillez vous authentifier pour continuer.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
.welcome{
    margin-bottom: 4rem;
    &__wrapper{
    display: flex;
    align-items: center;
    font-size: 1.2em;
    }
}

.welcome__logo{
    max-width: 33%;
    max-height: 100px;
}
</style>
