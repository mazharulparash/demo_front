<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Products List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(product, index) in products"
            :key="index"
            @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>Product</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>SKU:</strong></label> {{ currentProduct.sku }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentProduct.description }}
        </div>
        <div>
          <label><strong>category:</strong></label> {{ currentCategory }}
        </div>
        <div>
          <label><strong>Price:</strong></label> ${{ currentProduct.price }}
        </div>

        <a class="badge badge-warning"
           :href="'/products/' + currentProduct.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product...</p>
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
  name: "products-list",
  data() {
    return {
      products: [],
      categories: [],
      currentProduct: null,
      currentCategory: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveProducts() {
      let self = this;
      this.$session.start();
      if (this.$session.has('login')) {
        let sdata = this.$session.get('login')
        if (sdata[0] && sdata[2] == 'admin') {
          ProductDataService.getAll()
              .then(response => {
                this.products = response.data.products;
                this.categories = response.data.categories;
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

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },

    setActiveProduct(product, index) {
      let _this = this;
      _this.currentProduct = product;
      _this.currentIndex = index;
      _this.categories.forEach(function(c){
        if (c.id == _this.currentProduct.category_id) {
          _this.currentCategory = c.name;
        }
      })
    }
  },
  mounted() {
    this.retrieveProducts();
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




