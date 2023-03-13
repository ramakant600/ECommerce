<template>
<div>
<!-- <q-btn @click="goToRegister">go to Register page</q-btn> -->
    <q-card style="width:40vw;margin:15vh 0 0 30vw">
      <q-card-section>
        <q-input id="userInput" v-model="username" label="Username"></q-input>
        <q-input
          id="password"
          v-model="password"
          label="Password"
          type="password"
        ></q-input>
        <q-btn label="Login" color="primary" @click="login"></q-btn>
      </q-card-section>
    </q-card>
</div>

</template>

<script>
import axios from "axios";
// import router from "router/routes.vue"
// import { createRouter } from 'vue-router'; 
// const router = createRouter(); 
export default {
  name: "adminLoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    // goToRegister(){
    //  this.$router.push("/register")
    // },
    login(event) {
      // Do something with the username and password

      console.log("LOged in");
      //   axios.post('localhost')
      const creds = {
        email: this.username,
        password: this.password,
      };
      console.log(creds);

      axios
        .post("http://localhost:5000/adminLogin", creds)
        .then((response) => {
          console.log(response);

          if (response.data.message === "login sucess") {
            console.log(response.data);
          //  router.push('/dashboard')
           let userData=  JSON.stringify(response.data.user);
           localStorage.setItem('userData',userData)
           this.$router.push("/admin/dashboard")
           
          } else {
            alert(response.data.message);
            let data = [true, response.data.user]
            
          }
        })
        .catch((err, response) => {
          console.log("error inside catch-" + err);
        });
    },
  },
};
</script>