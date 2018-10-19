const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');


router.get('/', (req, res) => {
	res.json({status: "/home is running healthy."});
});

router.get('/dashboard', (req, res) => homeController.renderHome(req, res));
router.get('/getData', (req, res) => homeController.getData(req, res));

module.exports = router;