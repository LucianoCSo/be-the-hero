const express = require('express')
const ongController = require('./controller/ongController')
const incidentsController = require('./controller/incidentController')
const profileController = require('./controller/profileController')
const sessinController = require('./controller/sessionController')
const routes = express.Router()

routes.post('/session', sessinController.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.creaate)
// routes.delete('ongs/delete', ongController.delete)

routes.get('/incidents', incidentsController.index)
routes.post('/incidents', incidentsController.create)
routes.delete('/incidents/:id', incidentsController.delete)
routes.put('/incidents/:id', incidentsController.editar)

routes.get('/profile', profileController.index)
module.exports = routes