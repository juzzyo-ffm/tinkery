const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page'
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({error: 'search for stuff, dummy'});
    }

    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            title: 'Error',
            error: 'Please include and address for weather information.'
        });
    }

    // include call to weather module
    weather(req.query.address, (error, {place_name, weatherData} = {}) => {
        if (error) {
            return res.send({
                title: 'Error',
                error
            });
        }

        res.send({
            title: 'Weather',
            location: place_name,
            body: weatherData,
            address: req.query.address
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ummm, nope'
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});