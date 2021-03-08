const axios = require('axios').default;

let host = window.location.origin;
let BaseApi = axios.create({baseURL: `/api`});

export let Api = function() {
    return BaseApi;
}