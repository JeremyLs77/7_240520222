<template>
  <mainHeader></mainHeader>
  <mainForum></mainForum>
  <mainFooter></mainFooter>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue';
import mainFooter from '@/components/mainFooter.vue';
import mainForum from '@/components/mainForum.vue';

export default {
  name: 'ForumView',
  components: {
    mainHeader,
    mainForum,
    mainFooter
  }
}
</script>