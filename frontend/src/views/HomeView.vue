<template>
  <div class="home">
    <mainHeader></mainHeader>
    <Accueil msg="Welcome to Your Vue.js App"/>
    <mainConnect></mainConnect>
    <mainFooter></mainFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import Accueil from '@/components/Accueil.vue';
import mainHeader from '@/components/mainHeader.vue';
import mainConnect from '@/components/mainConnect.vue';
import mainFooter from '@/components/mainFooter.vue';

export default {
  name: 'HomeView',
  components: {
    Accueil,
    mainHeader,
    mainConnect,
    mainFooter
  }
}
</script>

<style scoped lang="scss">
</style>
