const request = require('request');

const forecast = (lat, long, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=3e8344c270bc701683dc2476eb32cfa2&query=${lat},${long}`;

    request({ url: forecastURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Service.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const { temperature, weather_descriptions: description } = response.body.current;
            callback(undefined, `${description}. It is ${temperature} degree celsius out there.`)
        }
    })
};

module.exports = forecast;