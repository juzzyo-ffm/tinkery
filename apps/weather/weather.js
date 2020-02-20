#!/usr/bin/env node

const chalk = require('chalk');
const weatherProvider = require('./weather_provider');
const geocode = require('./geocode_provider');

/**
 pass in a location argument to get weather data in the console
 */

const weather = (address, callback) => {

    geocode(address, (error, geocodeData) => {
        if (error) {
            return console.log(`Cannot get geocode data: ${error}`);
        }
        const {lat, lon, place_name} = geocodeData;
        weatherProvider(lat, lon, (error, weatherData) => {
            if (error) {
                return console.log(`Cannot get weather data: ${error}`);
            }

            callback({
                place_name,
                weatherData
            });
        });
    });
};

module.exports = weather;
