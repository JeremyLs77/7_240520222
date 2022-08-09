<template>
  <div class="home">
    <mainHeader></mainHeader>
    <Accueil msg="Welcome to Your Vue.js App"/>
    <mainSignup></mainSignup>
    <mainFooter></mainFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import Accueil from '@/components/Accueil.vue';
import mainHeader from '@/components/mainHeader.vue';
import mainSignup from '@/components/mainSignup.vue';
import mainFooter from '@/components/mainFooter.vue';

export default {
  name: 'SignupView',
  components: {
    Accueil,
    mainHeader,
    mainSignup,
    mainFooter
  }
}
</script>

<style scoped lang="scss">
</style>
