const chalk = require('chalk');
const request = require('request');

// darksky api
const basepath = 'https://api.darksky.net/forecast/';
const key = '04705380b5310255ee9945f162f137da';
let url = (lat, lon) => {
    return `${basepath}${key}/${lat},${lon}?units=ca`;
};
const format_darksky_weather = (data) => {
    console.log(chalk.blue('Formatting weather data.'));
    try {
        const {temperature = '-', summary} = data.currently;
        const {summary: dailySummary} = data.daily;
        const today = `Currently: 
            ${temperature}C. 
            ${summary}. 
            ${dailySummary}\n`;
        const {summary: dailySummaryTomorrow, temperatureLow, temperatureHigh, precipProbability, cloudCover} = data.daily.data[0];
        const tomorrow = `Tomorrow:
            Min ${temperatureLow}C 
            Max ${temperatureHigh}C 
            ${dailySummaryTomorrow}
            ${Math.round(precipProbability * 100)}% chance of rain. 
            ${Math.round(cloudCover * 100)}% cloud cover.`;
        return today + tomorrow;
    } catch (e) {
        return 'Unable to format weather data';
    }
};
// end darksky api

const fetch_weather = (lat, lon, callback) => {
    console.log(chalk.blue('Fetching weather data.'));
    request({
        url: url(lat, lon),
        json: true
    }, (error, response) => {
        if (error) {
            return callback(error, undefined);
        }

        callback(undefined, response.body);
    });

};

const weather = (lat, lon, callback) => {
    fetch_weather(lat, lon, (error, data) => {
        if (error) {
            return callback(error, undefined);
        }

        callback(undefined, format_darksky_weather(data));
    });
};

module.exports = weather;