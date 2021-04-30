<template>
  <h4>Successfully Logged Out</h4>
</template>

<script>
import Vue from 'vue';
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "log-out",
  data() {
    return {

    };
  },
  methods: {
    resetSession() {
      let self = this;
      this.$session.start();
      if (this.$session.has('login')) {
        this.$session.set('login', [false, '', '']);
        self.$router.push('/login');
      }
      else {
        self.$router.push('/login');
      }
    }
  },
  mounted() {
    this.resetSession();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>






