import axios from "axios";

const reviewInstance = axios.create({
    baseURL: "http://localhost:3000/",
});

export default reviewInstance;
