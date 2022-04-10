const express = require('express');
const app = express();
const port = 3004;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const session = require('express-session');
var stringify = require('json-stringify');

const server = app.listen(port, () => {
    console.log("Server is start at " + port);
})

app.set('view engine', "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'bbq chips',
    resave: true,
    saveUninitialized: true
}))

//Routes/******************************** */
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use('/login', loginRoute);
app.use('/register', registerRoute);



app.get('/', middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: "Home",
        UserName: req.session.user.username,
        UserLoggedIn: req.session.user,
        UserLoggedInJs: JSON.stringify(req.session.user)
    }
    res.status(200).render('home', payload);
})