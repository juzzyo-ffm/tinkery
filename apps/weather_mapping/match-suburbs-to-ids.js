const fs = require('fs');
const chalk = require('chalk');

const location_data = fs.readFileSync('./suburb_to_apollo_id_dict.json');
const location_json = JSON.parse(location_data);
const radio_town_names = fs.readFileSync('./radio_town_names.js');
const towns = JSON.parse(radio_town_names.toString()).towns;

// look for towns
let output = '';
for (let i = 0, n = towns.length; i < n; i++) {
    let loc = location_json[towns[i]];
    if (loc && loc.length) {
        output += towns[i] + " > " + loc + '\n'
    } else {
        output += '000 ' + towns[i] + '\n';
    }
}
console.log(output);
fs.writeFileSync('./matched-suburbs.txt', output);

// if we don't find a match, log it