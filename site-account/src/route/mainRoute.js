const express = require('express');
const router = express.Router()
const MainController = require('../app/controllers/MainController.js');

router.get('/set-cookie', (req, res, next) => {
    res.cookie('NAME', 'JWT USER TOKEN').send('cookie set');
})
router.get('/get-cookie', (req, res, next) => {
    return res.json(req.cookies);
})
module.exports = router;
