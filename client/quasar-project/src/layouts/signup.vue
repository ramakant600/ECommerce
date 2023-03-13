<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    <sigupPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import sigupPage from 'components/signup.vue'

export default defineComponent({
  name: 'sigupLayout',

  components: {
    sigupPage
  },

  
})
</script>
<style>
q-page-container{
    width: 80vw;
}

</style>
