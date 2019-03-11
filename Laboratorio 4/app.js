//Daniel Alejandro Saldana Garcia
//A00818923
//Laboratorio 4 - HTTP Requests

const credentials = require('./credentials.js')
const request = require('request')

let city = 'null'
let linkMap

const read = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

read.question('Insert the name of a city: ', function(cityName){
    linkMap = 
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`
    coordLocation(cityName)
    read.close()
})

function coordLocation(city)
{
    request.get({url:linkMap, json:true}, function(error, response, body){
        if(error || city === "")
        {
            console.log("'City Name' field empty " + error)
        }
        else
        {
            console.log(body.features[0].place_name)
            let lat = body.features[0].center[1]
            let long = body.features[0].center[0]
            weather(lat, long)
        }
    })
}

function weather(lat, long){
    let linkDS = 
    `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?units=si&lang=es`
    request.get({url: linkDS, json: true}, function(error, response, body) {
        if(error)
        {
            console.log("There was an error " + error)
        }
        else
        {
            let today = body.currently.summary
            let temperature = body.currently.temperature
            let rain = body.currently.precipProbability
            
            let forecast = 
            `${today}. Current temperature is ${temperature} °C. There's a ${rain}% of precipitation probability.`
            console.log(forecast)
        }
    })
}