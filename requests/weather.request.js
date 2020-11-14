const rp = require('request-promise')

//module export
module.exports = async function(city = '') {
  if (!city) {
    throw new Error('Field can not be empty')
  }

  //api key
  const KEY = '8ddb2ae4d480545c1441bb2374c9ff6d'

  //api url
  const uri = 'http://api.openweathermap.org/data/2.5/weather'

  //send api request
  const options = {
    uri,
    qs: {
      appid: KEY,
      q: city,
      units: 'imperial'
    },
    json: true
  }

  try {
    const data = await rp(options)

    //translate kelvin in celsius
    const celsius = (data.main.temp - 32) * 5/9

    return {
      weather: `${data.name}: ${celsius.toFixed(0)}`,
      error: null
    }
  } catch (error) {
    return {
      weather: null,
      error: error.error.message
    }
  } 
}