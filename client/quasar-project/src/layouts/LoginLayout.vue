<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    <LoginForm />   
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import LoginForm from 'components/Login.vue'

export default defineComponent({
  name: 'LoginLayout',

  components: {
    LoginForm
  },

  
})
</script>
<style>
q-page-container{
    width: 80vw;
}

</style>
