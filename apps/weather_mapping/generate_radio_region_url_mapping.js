const fs = require('fs')


const data = fs.readFileSync('./primaries_updated.txt');
let locData = data.toString();
const dict = fs.readFileSync('./suburb_to_apollo_id_dict.json');
let dictJSON = JSON.parse(dict.toString());
const locArray = locData.split('\n');

locArray.forEach(loc => {
    try {
        console.log(dictJSON[loc]['locUrl']);
    } catch (e) {
        console.log(`>>>${loc}`)
    }
})