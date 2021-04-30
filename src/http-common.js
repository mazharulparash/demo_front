import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/demo_back/api",
  headers: {
    "Content-type": "application/json"
  }
});
