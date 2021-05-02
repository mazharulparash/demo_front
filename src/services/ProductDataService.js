import http from "../http-common";

class ProductDataService {
    getAll() {
        return http.get("/products.php/");
    }
    
    logIn(data) {
        return http.post("/login.php/", data);
    }
    
    register(data) {
        return http.post("/login.php/register/", data);
    }

    get(id) {
        return http.get(`/products.php/${id}`);
    }

    create(data) {
        return http.post("/products.php/", data);
    }

    update(id, data) {
        return http.put(`/products.php/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products.php/${id}`);
    }

    getOrders() {
        return http.get("/orders.php/");
    }

    getOrder(id) {
        return http.patch(`/orders.php/${id}`);
    }

    getCusOrders(id) {
        return http.get(`/orders.php/${id}`);
    }

    updateStatus(id, data) {
        return http.put(`/orders.php/${id}`, data);
    }
    
    placeOrder(data) {
        return http.post("/orders.php/place", data);
    }
}

export default new ProductDataService();



