const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utilities/forecast');
const geocode = require('./utilities/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config.
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saurabh Negi'
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Saurabh Negi'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Saurabh Negi'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    };
    geocode(req.query.address, (error, response = {}) => {
        if (error) {
            return res.send({ error })
        }

        const { latitude, longitude, location } = response;

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMsg: 'Help page not found'
    })
});
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMsg: 'Page not found'
    })
});

// Starting the Server
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});