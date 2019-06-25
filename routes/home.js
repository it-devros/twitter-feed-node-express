const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')



router.get('/', (req, res) => homeController.renderHome(req, res))
router.get('/dashboard', (req, res) => homeController.renderHome(req, res))
router.get('/getData', (req, res) => homeController.getData(req, res))
router.get('/search', (req, res) => homeController.getDataSearch(req, res))

router.post('/', (req, res) => homeController.renderHome(req, res))

module.exports = router