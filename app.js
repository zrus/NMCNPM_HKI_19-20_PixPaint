const express = require('express');
const app = express();

let expressHbs = require('express-handlebars');

app.use(express.static(__dirname + '/assets'));

let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layouts',
    layoutsDir: __dirname + '/views/layouts/'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('pixpaint');
});
  

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log('Server is running');
});



