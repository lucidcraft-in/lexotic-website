'use client'

import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:5000/'
    // baseURL: 'http://13.201.152.51:5000/'

})

export default Axios