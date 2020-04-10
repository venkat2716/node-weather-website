const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Venkatesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Venkatesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text..',
        title: 'Help',
        name: 'Venkatesh'
    })
})

app.get('/weather', (req, res) => {
    // const geoAddress = req.query.address

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
    // res.send({
    //     forecast: 'somethidng forecast',
    //     location: 'hyderabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search item'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Venkatesh',
        errorMessage: 'Help article not found!'
    })
})
app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404 page',
        name: 'Venkatesh'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port number 3000')
})