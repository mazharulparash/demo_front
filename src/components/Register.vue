<template>
  <div v-if="!submitted" class="submit-form">
    <div class="form-group">
      <label for="fullname">Full Name</label>
      <input type="text" class="form-control" id="fullname"
             v-model="formData.fullname"
      />
    </div>
    <div class="form-group">
      <label for="username">UserName</label>
      <input type="text" class="form-control" id="username"
             v-model="formData.username"
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email"
             v-model="formData.email"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password"
             v-model="formData.password"
      />
    </div>

    <div class="m-2" v-if="errors.length > 0">
      <p v-for="error in errors" v-bind:key="error" class="text-danger p-0 m-0">{{ error }}</p>
    </div>

    <div class="m-2">
      <a href="/login">Log In!</a>
    </div>

    <button @click="register" class="btn btn-success">Register</button>
  </div>

  <div v-else>
    <h4>You registered successfully!</h4>
    <a href="/login" class="btn btn-success">Log In</a>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductDataService from "../services/ProductDataService";
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "register",
  data() {
    return {
      formData: {
        fullname: '',
        username: '',
        email: '',
        password: '',
      },
      errors: [],
      submitted: false
    };
  },
  methods: {
    validate() {
      this.errors = [];
      let flag = true;
      if (!this.formData.fullname || this.formData.fullname == "") {
        this.errors.push("Full Name Field Required!")
        flag = false;
      }
      if (!this.formData.username || this.formData.username == "") {
        this.errors.push("Username Field Required!")
        flag = false;
      }
      if (!this.formData.email || this.formData.email == "") {
        this.errors.push("Email Field Required!")
        flag = false;
      }
      if (!this.formData.password || this.formData.password == "") {
        this.errors.push("Password Field Required!")
        flag = false;
      }
      return flag;
    },

    register() {
      let validate = this.validate();
      console.log(validate);
      if(validate) {
       ProductDataService.register(this.formData)
          .then(response => {
            console.log(response.data);
            if (response.data.success) {
              this.submitted = true;
            }
            else {
              this.errors.push('Registration Failed!!')
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },

    checkSession() {
      let self = this;
      this.$session.start();
      if (this.$session.has('login')) {
        let sdata = this.$session.get('login')
        if (sdata[0] && sdata[2] == 'admin') {
          self.$router.push('/products');
        }
      }
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  },
  mounted() {
    this.checkSession();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>










