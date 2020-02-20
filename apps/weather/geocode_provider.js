const chalk = require('chalk');
const request = require('request');

// mapbox api
const url = (search) => {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search)}.json?access_token=pk.eyJ1IjoianV6enlvIiwiYSI6ImNrNmtpcjg5dDAxbDQzam4weDNsd29zNXEifQ.UK-Imo-OknO7VxcFFwrd4Q&limit=1`;
};
const getMapboxData = (data) => {
    const [lon, lat] = data[0].center;
    const {place_name} = data[0];
    return {lat, lon, place_name};
}
// end mapbox api

const getGeocode = (search, callback) => {
    console.log(chalk.blue(`Fetching geocode data for ${search}`));

    request({url: url(search), json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Please try another', undefined);
        } else {
            callback(undefined, response.body.features);
        }
    });
};


const geocode = (search, callback) => {
    getGeocode(search, (error, data) => {
        if (error) {
            return callback(error, undefined);
        }

        callback(undefined, getMapboxData(data));
    });
};

module.exports = geocode;
