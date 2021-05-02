<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Orders List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(order, index) in orders"
            :key="index"
            @click="setActiveOrder(order, index)"
        >
          {{ order.tracking_no }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentOrder">
        <h4>Order</h4>
        <div>
          <label><strong>Tracking No:</strong></label> {{ currentOrder.tracking_no }}
        </div>
        <div>
          <label><strong>Customer:</strong></label> {{ currentUser }}
        </div>
        <div>
          <label><strong>Product:</strong></label> {{ currentProduct }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentOrder.status }}
        </div>

        <a v-if="admin" class="badge badge-warning"
           :href="'/orders/' + currentOrder.id"
        >
          Change Status
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Order...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductDataService from "../services/ProductDataService";
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "orders",
  data() {
    return {
      orders: [],
      users: [],
      products: [],
      admin: false,
      currentOrder: null,
      currentUser: null,
      currentProduct: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveOrders() {
      let self = this;
      this.$session.start();
      if (this.$session.has('login')) {
        let sdata = this.$session.get('login')
        if (sdata[0] && sdata[2] == 'admin') {
          this.admin = true;
          ProductDataService.getOrders()
              .then(response => {
                this.orders = response.data.orders;
                this.products = response.data.products;
                this.users = response.data.users;
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }
        else if (sdata[0] && sdata[2] == 'customer') {
          ProductDataService.getCusOrders(sdata[1])
              .then(response => {
                this.orders = response.data.orders;
                this.products = response.data.products;
                this.users = response.data.users;
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }
        else {
          self.$router.push('/login');
        }
      }
      else {
        self.$router.push('/login');
      }
    },

    setActiveOrder(order, index) {
      let _this = this;
      _this.currentOrder = order;
      _this.currentIndex = index;
      _this.users.forEach(function(u){
        if (u.id == _this.currentOrder.customer_id) {
          _this.currentUser = u.fullname;
        }
      })
      _this.products.forEach(function(p){
        if (p.id == _this.currentOrder.product_id) {
          _this.currentProduct = p.name;
        }
      })
    }
  },
  mounted() {
    this.retrieveOrders();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>











