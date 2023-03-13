<template>
<q-template>
  <q-layout>

<q-page-container>
     <LoginForm />
</q-page-container>
  </q-layout>
 
<q-router>

</q-router>
</q-template>
</template>

<script>
import { defineComponent } from 'vue'
import LoginForm from '../components/login.vue'
export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  }

})
</script>
<style>

</style>
