const request = require('request');
const fs = require('fs');
const chalk = require('chalk');

const fetch = require('node-fetch');

// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// const url = 'https://api.darksky.net/forecast/04705380b5310255ee9945f162f137da/37.8267,-122.4233';
const url = './locations.json';

const location_url = 'https://stash.abc-dev.net.au/projects/INN/repos/apollo-graphql-weather/raw/apollo/src/modules/location/location-data/locations.json?at=refs%2Fheads%2Fmaster';

// alt request implementation

// try to read json from disk, otherwise
console.log(chalk.blue.inverse('fetching data'));
const data = fs.readFileSync('./locations.json', 'utf8');
const json = JSON.parse(data);
const values = Object.values(json);
const ob = {};
const re = / /g;
let locUrl;
for (const {id, suburb, state } of values){
    const moddedSuburb = suburb.replace(re, "-");
    let s = state.id;
    switch(state.id) {
        case "Northern Territory":
            s = "nt";
            break;
        case "Australian Capital Territory":
            s = "act";
            break;
        default:
    }
    locUrl = `https://www.abc.net.au/weather/${s}/${id.slice(9)}/`;
    ob[moddedSuburb] = {id, state: state.id, locUrl}
}
console.log(chalk.green('Writing to file...'));
fs.writeFileSync('./suburb_to_apollo_id_dict.json', JSON.stringify(ob, null, 2));
console.log(chalk.green('File write complete.'));


// console.log(values)
/*
request({url: url, json: true}, (error, response) => {
    const data = response;
    console.log(data)
})K

 */

// fetch implementation
/*
fetch(url)
    .then(res => res.json())
    .then(json => console.log(json.daily));

 */


/*
// request implementation
request({
    method: 'GET',
    uri: url
},
    function(error, response, body) {
    // console.log('data:', body);
    const j = JSON.parse(body);
    console.log(JSON.stringify(j, null, 2))
    })
.on('data', function(data){
    console.log('decoded chunk: ', data)
})
.on('response', function(response){
    response.on('data', function(data){
        console.log('received ' + data.length + ' bytes of compressed data');
    })
});

 */