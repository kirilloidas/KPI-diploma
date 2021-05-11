const axios = require('axios').default;

let host = window.location.origin;
let BaseApi = axios.create({baseURL: `${host}/api`});

export let Api = function() {
    return BaseApi;
}