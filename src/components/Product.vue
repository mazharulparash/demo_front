<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="currentProduct.name"
        />
      </div>
      <div class="form-group">
        <label for="sku">SKU</label>
        <input type="text" class="form-control" id="sku"
               v-model="currentProduct.sku"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
               v-model="currentProduct.description"
        />
      </div>
       <div class="form-group">
        <label>Category</label>
        <select v-model="currentProduct.category_id" class="form-control">
	<option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}
	</option>
    </select>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" class="form-control" id="price"
               v-model="currentProduct.price"
        />
      </div>
    </form>
    
    <div class="m-2" v-if="errors.length > 0">
      <p v-for="error in errors" v-bind:key="error" class="text-danger p-0 m-0">{{ error }}</p>
    </div>

    <button class="badge badge-danger mr-2"
            @click="deleteProduct"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
            @click="updateProduct"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductDataService from "../services/ProductDataService";
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      categories: [],
      errors:[],
      message: ''
    };
  },
  methods: {
    getProduct(id) {
      let self = this;
      this.$session.start();
      let sdata = this.$session.get('login')
      if (sdata[0] && sdata[2] == 'admin') {
        ProductDataService.get(id)
            .then(response => {
              this.currentProduct = response.data.product;
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
    },

    validate() {
      let flag = true;
      if (!this.currentProduct.name || this.currentProduct.name == "") {
        this.errors.push("Name Field Required!")
        flag = false;
      }
      if (!this.currentProduct.sku || this.currentProduct.sku == "") {
        this.errors.push("SKU Field Required!")
        flag = false;
      }

      if (!this.currentProduct.category_id || this.currentProduct.category_id == "") {
        this.errors.push("Category Field Required!")
        flag = false;
      }

      if (!this.currentProduct.price || this.currentProduct.price == "") {
        this.errors.push("Price Field Required!")
        flag = false;
      }
      return flag;
    },

    updateProduct() {
      this.errors = [];
      if (this.validate()) {
        ProductDataService.update(this.currentProduct.id, this.currentProduct)
            .then(response => {
              console.log(response.data.message);
              this.message = response.data.message;
            })
            .catch(e => {
              console.log(e);
            });
      }
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "products" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>







