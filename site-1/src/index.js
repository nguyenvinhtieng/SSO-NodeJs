const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const route = require('./route/index.js');
const credentials = require('./credentials');

app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'cookie secret key',
    cookie: {
        domain: 'vinhtieng.local',
    }
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

const KEY = 'abcklajsdjsad';

app.get('/', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.send('You are login with token ' + token);
    } else {
        res.send('You are not login');
    }
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})