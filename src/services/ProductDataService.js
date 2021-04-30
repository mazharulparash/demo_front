import http from "../http-common";

class ProductDataService {
    getAll() {
        return http.get("/products.php");
    }
    
    logIn(data) {
        return http.post("/login.php", data);
    }

    get(id) {
        return http.get(`/products.php/${id}`);
    }

    create(data) {
        return http.post("/products.php", data);
    }

    update(id, data) {
        return http.put(`/products.php/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products.php/${id}`);
    }
}

export default new ProductDataService();
