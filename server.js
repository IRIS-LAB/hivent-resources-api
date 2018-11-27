// For logging purpose
import * as winston from "./config/winston"
const logger = winston.setLogger()


import express from 'express'
import bodyParser from 'body-parser'
import * as resourcesEBS from "/home/pi/hivent-resources-api/exposition/ResourcesEBS"
import * as actuatorEBS from './exposition/ActuatorEBS'
import basicAuth from 'express-basic-auth'



const basicAuthConfig = { users: { 'test': 'test' }}
const app = express()
const port = process.env.PORT || 8084



app.listen(port, () => {
  logger.info(`Hivent Resources service started on http://localhost:${port}`)
})

// pour exposer en basic Auth
app.use(basicAuth(basicAuthConfig))

// Pour récupérer body des requêtes
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/resources', resourcesEBS.getRouter())
app.use('/actuator', actuatorEBS.getRouter())
