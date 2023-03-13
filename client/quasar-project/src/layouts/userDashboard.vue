<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    <userDashboardPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import userDashboardPage from 'pages/userDashboard.vue'

export default defineComponent({
  name: 'userdashboardLayout',

  components: {
    userDashboardPage
  },

  
})
</script>
<style>
q-page-container{
    width: 80vw;
}

</style>
