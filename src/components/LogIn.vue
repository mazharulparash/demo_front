<template>
  <div class="submit-form">
    <div class="form-group">
      <label for="username">UserName</label>
      <input type="text" class="form-control" id="username"
             v-model="formData.username"
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

    <button @click="logIn" class="btn btn-success">Log In</button>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductDataService from "../services/ProductDataService";
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "log-in",
  data() {
    return {
      formData: {
        username: '',
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
      if (!this.formData.username || this.formData.username == "") {
        this.errors.push("Username Field Required!")
        flag = false;
      }
      if (!this.formData.password || this.formData.password == "") {
        this.errors.push("Password Field Required!")
        flag = false;
      }
      return flag;
    },

    logIn() {
      let self = this;
      let validate = this.validate();
      console.log(validate);
      if(validate) {
       ProductDataService.logIn(this.formData)
          .then(response => {
            console.log(response.data);
            if (response.data.authenticate == 'done') {
              self.$router.push('/');
            }
            else {
              this.errors.push('Username and Password did not match!')
            }
             this.$session.start();
             this.$session.set('login', response.data.session)
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  },
  mounted() {
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>



