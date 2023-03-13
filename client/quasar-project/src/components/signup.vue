<template>
  <div>
    <q-btn @click="goToLogin" style="margin: 1% 0 0 88%"
      >go to Login page</q-btn
    >
    <h5 style="margin: 3% 0 -3% 45%">Register</h5>
    <q-form
      style="width: 40vw; margin-left: 30%; margin-top: 5%"
      enctype="multipart/form-data"
      class="q-mx-lg"
      ref="form"
    >
      <q-input
        id="fname"
        v-model="fname"
        standout
        label="Enter first Name"
        :rules="fnameRules"
        class="q-my-sm"
      />
      <q-input
        id="lname"
        v-model="lname"
        standout
        label="Enter last name"
        :rules="lnameRules"
        class="q-my-sm"
      />
      <q-input
        standout
        v-model="email"
        type="email"
        label="Username"
        :rules="emailRules"
      />
      <q-input
        v-model="password"
        filled
        :type="ispwd ? 'password' : 'text'"
        hint="please enter 6 to 10 digit Password"
        :rules="pwdRules"
      >
        <template v-slot:append>
          <q-icon
            :name="ispwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="ispwd = !ispwd"
          />
        </template>
      </q-input>
      <q-input
        standout
        id="address1"
        v-model="address1"
        type="text"
        label="Enter Primary address"
        class="q-my-sm"
        :rules="addressrules"
      ></q-input>
      <!-- <q-input
      standout
      id="address2"
      v-model="address2"
      type="text"
      label="Enter temporary address"
    ></q-input> -->
      <!-- <q-input id="image" v-model="image" type="file" class="q-my-sm"></q-input> -->
      <q-btn type="submit" style="margin: 5% 0 0 35%" @click="Submithandler"
        >Submit</q-btn
      >
    </q-form>
  </div>
</template>
<script>
import axios from "axios";
// import { createRouter } from 'vue-router';
// const router = createRouter();
import { useQuasar } from "quasar";
export default {
  name: "sigupComponent",

  data() {
    return {
      $q: useQuasar(),
      fname: "",
      fnameRules: [
        (v) => /^[a-zA-Z]{1,25}$/.test(v) || "please enter valid fname",
      ],
      lnameRules: [
        (v) => /^[a-zA-Z]{1,25}$/.test(v) || "please enter valid fname",
      ],
      lname: "",
      email: "",
      ispwd: true,
      password: "",
      address1: "",
      addressrules: [
        (v) =>
          /[:;,\-@0-9a-zA-Zâéè'.\s]{1,1000}$/.test(v) ||
          "please enter valid address",
      ],
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      pwdRules: [
        (v) =>
          /[:;,\-@0-9a-zA-Zâéè'.\s]{6,10}$/.test(v) ||
          "please enter password of length 6 to 10",
      ],
    };
  },
  methods: {
    Submithandler() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          let formData = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            password: this.password,
            address1: this.address1,
          };

          console.log(formData);
          axios
            .post("http://localhost:5000/Register", formData)
            .then((response) => {
              console.log(response);
              //   this.getProducts();

              if (!response.data.message) {
                // this.showNotif();

                this.fname = "";
                this.lname = "";
                this.email = "";
                this.password = "";
                this.address1 = "";
              } else {
                alert(response.data.message);
              }
              localStorage.setItem("isLogedin", true);
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.user)
              );
              let Cart = localStorage.getItem("cartProduct");
              Cart = JSON.parse(Cart);
              console.log("cart", Cart);
              if (Cart != null || Cart != undefined) {
                var newCart = {};
                newCart[response.data.user._id] = Cart["visiter"];
                //  Cart = Cart.remove("visiter");
                let CartString = JSON.stringify(newCart);
                localStorage.setItem("cartProduct", CartString);
              }
              this.$router.push("/");
            })
            .catch((err, response) => {
              console.log("error inside catch-" + err);
              // this.showNotif();
            });
          // }
        }else{
          console.log("gfkjfngfdkg",valid);
        }
      });
    },
    showNotif() {
      this.$q.notify({
        message: "registration failed.",
        color: "red",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      });
    },
    goToLogin() {
      this.$router.push("login");
    },
  },
  computed: {},
};
</script>
