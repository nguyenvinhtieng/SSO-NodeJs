const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');

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

app.get('/', async (req, res) => {
    let userToken = await jwt.sign({ username: 'vinhtieng' }, KEY);

    res.cookie('token', userToken, { domain: 'vinhtieng.local', httpOnly: true });

    let html = `
        <p>You are login with token: ${userToken}</p>
        <a href="/logout">Logout</a>
    `;

    res.send(html);
});

app.get('/logout', (req, res) => {
    // Remove cookie
    res.clearCookie('token', { domain: 'vinhtieng.local' });
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    let html = `
        <h1>Click to login</h1>
        <a href="/">Login</a>
    `;
    res.send(html);
});

app.get('/get-token', async (req, res) => {
    let token = req.cookies.token;
    res.send(token);
});



app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})