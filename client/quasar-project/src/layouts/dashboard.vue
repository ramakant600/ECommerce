<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    <DashboardPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import DashboardPage from 'pages/dashboard.vue'

export default defineComponent({
  name: 'dashboardLayout',

  components: {
    DashboardPage
  },

  
})
</script>
<style>
q-page-container{
    width: 80vw;
}

</style>
