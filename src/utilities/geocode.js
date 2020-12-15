const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2F1cmFiaC0wMCIsImEiOiJja2lsZmJoaXEwajRuMnJwa2Y3dGF0aGRjIn0.HS3bvhsdEOQ63eUMCTOa8w&limit=1`;

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Location Service.', undefined)
        } else if (!response.body.features.length) {
            callback('Unable to find location. Try again with different search.', undefined)
        } else {
            const [longitude, latitude] = response.body.features[0].center;
            const location = response.body.features[0].place_name;
            callback(undefined, { latitude, longitude, location })
        }
    })
};

module.exports = geocode;