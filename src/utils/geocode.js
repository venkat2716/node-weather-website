const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidnZyZWRkeSIsImEiOiJjazhyaWdtZDkwMzNzM2ZxZmhoMmdqY3p5In0.TvvQ4e4W6O2K3sB7JzdEVA&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to the location services!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another location', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],                
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode