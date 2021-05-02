<template>
  <div v-if="currentOrder" class="edit-form">
    <h4>Order</h4>
    <form>
      <div>
        <label><strong>Tracking No:</strong></label> {{ currentOrder.tracking_no }}
      </div>
      <div class="form-group">
        <label>Status</label>
        <select v-model="currentOrder.status" class="form-control">
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
    </form>

    <div class="m-2" v-if="errors.length > 0">
      <p v-for="error in errors" v-bind:key="error" class="text-danger p-0 m-0">{{ error }}</p>
    </div>

    <button type="submit" class="badge badge-success"
            @click="updateOrder"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Order...</p>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductDataService from "../services/ProductDataService";
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "order",
  data() {
    return {
      currentOrder: null,
      categories: [],
      errors:[],
      message: ''
    };
  },
  methods: {
    getOrder(id) {
      let self = this;
      this.$session.start();
      let sdata = this.$session.get('login')
      if (sdata[0] && sdata[2] == 'admin') {
        ProductDataService.getOrder(id)
            .then(response => {
              this.currentOrder = response.data.order;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
      else {
        self.$router.push('/login');
      }
    },

    validate() {
      let flag = true;
      if (!this.currentOrder.status || this.currentOrder.status == "") {
        this.errors.push("Status Field Required!")
        flag = false;
      }
      return flag;
    },

    updateOrder() {
      this.errors = [];
      if (this.validate()) {
        ProductDataService.updateStatus(this.currentOrder.id, this.currentOrder)
            .then(response => {
              console.log(response.data.message);
              this.message = response.data.message;
            })
            .catch(e => {
              console.log(e);
            });
      }
    }
  },
  mounted() {
    this.message = '';
    this.getOrder(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>










