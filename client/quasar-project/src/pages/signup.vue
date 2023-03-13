<template>
<q-template>
<q-layout>
 
     <sigupComponent />
 
</q-layout>
<q-router>

</q-router>
</q-template>
</template>

<script>
import { defineComponent } from 'vue'
import sigupComponent from '../components/signup.vue'
export default defineComponent({
  name: 'sigupPage',
  components: {
    sigupComponent
  }

})
</script>
<style>

</style>
