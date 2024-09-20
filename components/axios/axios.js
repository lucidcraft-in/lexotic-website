import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:5000/'
    // baseURL: 'http://13.233.174.41:5000/'

})

export default Axios