<template>
  <div>
    <q-btn @click="goBack" icon="previous" style="margin: 1% 0 0 2%;"
      >Go Back</q-btn
    >
    <q-btn @click="goToRegister" style="margin: 1% 0 0 77%;"
      >go to Register page</q-btn
    >
    <q-card style="width: 40vw; margin: 15vh 0 0 28vw">
      <h6 style="margin: 0 0 0 43%">Login</h6>
      <q-card-section>
        <q-form enctype="multipart/form-data" ref="form">
          <q-input
            v-model="email"
            type="email"
            label="Email"
            :rules="emailRules"
          />
          <q-input
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="q-my-sm"
          ></q-input>
          <q-btn
            color="primary"
            type="submit"
            @click="login"
            style="margin: 3% 0 0 41%"
          >Submit</q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
// import { ref } from 'vue'
// import { createRouter } from 'vue-router';
// const router = createRouter();
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    goBack() {
      this.$router.push("/");
      // history.go(-1);
    },
    login(event) {
     this.$refs.form.validate().then(valid => {
        if (valid) {
          const creds = {
        email: this.email,
        password: this.password,
      };
      console.log(creds);
      axios
        .post("http://localhost:5000/Login", creds)
        .then((response) => {
          console.log(response);
          if (response.data.message == "login sucess") {
            console.log(response.data);
            let userData = JSON.stringify(response.data.user);
            localStorage.setItem("isLogedin",true);
            localStorage.setItem("userData", userData);
            let Cart = localStorage.getItem("cartProduct");
            Cart = JSON.parse(Cart)
            var newCart = {}
             newCart[response.data.user._id] = Cart["visiter"]
            //  Cart = Cart.remove("visiter");
             let CartString = JSON.stringify(newCart);
             localStorage.setItem("cartProduct",CartString);
             this.$router.push("/");
            // console.log("inside push=================");
            // this.$router.push({
            //   name: "userDashboardComponent",
            //   params: {
            //     userData: response.data.user,
            //     isLogedin: true,
              // },
            // });
          } else {
            alert("Invalid credentials");
            let data = [true, response.data.user];
          }
        })
        .catch((err, response) => {
          console.log("error inside catch-" , err);
        });
        }else{
          
        }
      })
    },
  },
};
</script>