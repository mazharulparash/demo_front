<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="product.name"
        />
      </div>
      <div class="form-group">
        <label for="sku">SKU</label>
        <input type="text" class="form-control" id="sku"
               v-model="product.sku"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
               v-model="product.description"
        />
      </div>
       <div class="form-group">
        <label>Category</label>
        <select v-model="product.category_id" class="form-control">
        <option value=""> Select One</option>
	<option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}
	</option>
    </select>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" class="form-control" id="price"
               v-model="product.price"
        />
      </div>
      
      <div class="m-2" v-if="errors.length > 0">
      <p v-for="error in errors" v-bind:key="error" class="text-danger p-0 m-0">{{ error }}</p>
    </div>

      <button @click="saveProduct" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductDataService from "../services/ProductDataService";
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        description: "",
        sku: "",
        price: "",
        category_id: "",
      },
      errors: [],
      categories: [],
      products: [],
      submitted: false
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
    
    validate() {
      this.errors = [];
      let flag = true;
      if (!this.product.name || this.product.name == "") {
        this.errors.push("Name Field Required!")
        flag = false;
      }
      if (!this.product.sku || this.product.sku == "") {
        this.errors.push("SKU Field Required!")
        flag = false;
      }

      if (!this.product.category_id || this.product.category_id == "") {
        this.errors.push("Category Field Required!")
        flag = false;
      }

      if (!this.product.price || this.product.price == "") {
        this.errors.push("Price Field Required!")
        flag = false;
      }
      return flag;
    },
  
    saveProduct() {
      let validate = this.validate();
      console.log(validate);
      if(validate) {
       ProductDataService.create(this.product)
          .then(response => {
            this.product.id = response.data.id;
            console.log(response.data);
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
    this.retrieveProducts();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>


