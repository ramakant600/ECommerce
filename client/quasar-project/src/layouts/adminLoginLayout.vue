<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    <adminLoginForm />   
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import adminLoginForm from 'components/adminLogin.vue'

export default defineComponent({
  name: 'adminLoginLayout',

  components: {
    adminLoginForm
  },

  
})
</script>
<style>
q-page-container{
    width: 80vw;
}

</style>
