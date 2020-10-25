import axios from "axios";

const reviewInstance = axios.create({
    baseURL: "https://review-app-proto.herokuapp.com/",
});

export default reviewInstance;
