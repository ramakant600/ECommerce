<template>
<q-template>
<q-layout>
 
     <DashboardComponent />
 
</q-layout>
<q-router>

</q-router>
</q-template>
</template>

<script>
import { defineComponent } from 'vue'
import DashboardComponent from '../components/dashboard.vue'
export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardComponent
  }

})
</script>
<style>

</style>
