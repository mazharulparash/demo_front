import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: () => import("./components/ProductsList")
    },
    {
      path: "/products/:id",
      name: "product-details",
      component: () => import("./components/Product")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddProduct")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/LogIn")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("./components/LogOut")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register")
    },
    {
      path: "/customer",
      alias: "/customer_products",
      name: "customer_products",
      component: () => import("./components/CustomerProducts")
    },
    {
      path: "/orders",
      alias: "/orders",
      name: "orders",
      component: () => import("./components/Orders")
    },
     {
      path: "/orders/:id",
      name: "order-details",
      component: () => import("./components/Order")
    },
  ]
});

