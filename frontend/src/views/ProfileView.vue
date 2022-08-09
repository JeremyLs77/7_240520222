<template>
  <mainHeader></mainHeader>
  <mainProfile></mainProfile>
  <mainFooter></mainFooter>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue';
import mainFooter from '@/components/mainFooter.vue';
import mainProfile from '@/components/mainProfile.vue';

export default {
  name: 'ProfileView',
  components: {
    mainHeader,
    mainProfile,
    mainFooter
  }
}
</script>