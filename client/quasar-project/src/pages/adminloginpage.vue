<template>
<q-template>
  <q-layout>

<q-page-container>
     <adminLoginForm />
</q-page-container>
  </q-layout>
 
<q-router>

</q-router>
</q-template>
</template>

<script>
import { defineComponent } from 'vue'
import adminLoginForm from '../components/adminLogin.vue'
export default defineComponent({
  name: 'adminLoginForm',
  components: {
    adminLoginForm
  }

})
</script>
<style>

</style>
