const { default: axios } = require("axios");
const environment = require("../utils/environment");

const spotifyApi = {
    getQuote(payload) {
        return axios.post(`${environment.methaq.apiUrl}`, payload);
    },
};

module.exports = spotifyApi;