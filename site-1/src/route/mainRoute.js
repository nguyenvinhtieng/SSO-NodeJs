const express = require('express');
const router = express.Router()
const MainController = require('../app/controllers/MainController.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', async (req, res, next) => {
    let string = 'Hello from site-1';
    // Call API to get data from site-account SSO

    await fetch('http://vinhtieng.local:3000/set-cookie')
    let res1 = await fetch('http://vinhtieng.local:3000/get-cookie')
    let data = await res1.json()
    console.log(data)

    string += req.cookies['NAME']
    res.send(string);
})
module.exports = router;
