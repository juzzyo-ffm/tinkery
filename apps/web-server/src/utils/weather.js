const weatherProvider = require('./weather_provider');
const geocode = require('./geocode_provider');

/**
 pass in a location argument to get weather data in the console
 */

const weather = (address, callback) => {

    geocode(address, (error, {lat, lon, place_name} = {}) => {
        if (error) {
            return callback(error, undefined);
        }
        weatherProvider(lat, lon, (error, weatherData) => {
            if (error) {
                return callback(`Cannot get weather data: ${error}`, undefined);
            }

            callback(undefined, {
                place_name,
                weatherData
            });
        });
    });
};

module.exports = weather;
