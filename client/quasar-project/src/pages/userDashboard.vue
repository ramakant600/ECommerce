<template>
<q-template>
<q-layout>
 
     <userDashboardComponent />
 
</q-layout>
<q-router>

</q-router>
</q-template>
</template>

<script>
import { defineComponent } from 'vue'
import userDashboardComponent from '../components/userdashboard.vue'
export default defineComponent({
  name: 'userDashboardPage',
  components: {
    userDashboardComponent
  }

})
</script>
<style>

</style>
