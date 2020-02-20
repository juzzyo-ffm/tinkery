#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const weather = require('./weather_provider');
const geocode = require('./geocode_provider');

/**
 pass in a location argument to get weather data in the console
 */

const package = fs.readFileSync('./package.json', 'utf8');
yargs.version(JSON.parse(package).version);

yargs.command({
    command: 'get',
    describe: 'Gets weather data for location',
    builder: {
        l: {
            describe: 'The location of the search',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        geocode(argv.l, (error, geocodeData) => {
            if (error) {
                return console.log(`Cannot get geocode data: ${error}`);
            }
            const {lat, lon, place_name} = geocodeData;
            weather(lat, lon, (error, weatherData) => {
                if (error) {
                    return console.log(`Cannot get weather data: ${error}`);
                }
                console.log();
                console.log(chalk.green.inverse(place_name));
                console.log(chalk.cyan.bold(weatherData));
            });
        });
    }
});


yargs.parse();
