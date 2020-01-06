const express = require('express');
const app = express();

let expressHbs = require('express-handlebars');
let bodyParse = require('body-parser');

app.use(express.static(__dirname + '/assets'));

let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layouts',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir:__dirname + '/views/partials'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Body Parser Middleware
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

//Cookie Parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//Session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: null },
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.username = req.session.user ? req.session.user.username : '';
    res.locals.isLoggedIn = req.session.user ? true : false;
    next();
});

app.use('/users', require('./routes/userRouter'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pixpaint', (req, res) => {
    res.render('pixpaint');
})
  
app.get('/sync', (req, res) => {
    let models = require('./models');
    models.sequelize.sync()
    .then(() => {
        res.send('database sync completed!')
    });
});

const PORT = 5000;
app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'), () => {
    console.log(`Server is running at http://localhost:${app.get('port')}`);
});