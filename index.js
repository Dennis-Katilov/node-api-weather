//libraries
const express = require('express')
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.request')

//creating express app
const app = express()

//set views engine as ejs
app.set('view engine', 'ejs')

//public dir
app.use(express.static('public'))

//include parser body
app.use(bodyParser.urlencoded({extended: true}))

//GET
app.get('/', (req, res) => {
  res.render('index', {weather: null, error: null})
})

//POST
app.post('/', async (req, res) => {
  const { city } = req.body

  const {weather, error} = await weatherRequest(city)
  res.render('index', {weather, error})
})

//server start
app.listen(3000, () => {
  console.log('Server has started on port 3000...')
})