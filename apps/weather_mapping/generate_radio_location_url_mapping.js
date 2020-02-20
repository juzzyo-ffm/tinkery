const fs = require('fs')


const data = fs.readFileSync('./radio_town_names_EDITED.js');
let locData = data.toString();
const dict = fs.readFileSync('./suburb_to_apollo_id_dict.json');
let dictJSON = JSON.parse(dict.toString());
const locArray = locData.split('\n');

let result = '';
locArray.forEach(loc => {
    try {
        console.log(dictJSON[loc]['locUrl']);
        result += dictJSON[loc]['locUrl'] + '\n'
    } catch (e) {
        console.log(`>>>${loc}`)
        result += '0000' + loc + "\n"
    }
})


fs.writeFileSync('./matched-suburbs.txt', result);