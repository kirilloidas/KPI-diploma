const axios = require('axios').default;

let host = window.location.origin;
let BaseApi = axios.create({baseURL: `http://localhost:5000/api`});

export let Api = function() {
    return BaseApi;
}