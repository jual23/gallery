const express = require('express');
const app = express();
const PORT = 3000;
const handlebars = require('express-handlebars');
const bodyParser = require ('body-parser');

app.listen(PORT);
app.use(express.static('public'))
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
  }));

const galleryRoute = require('./api/routes');
app.use('/', galleryRoute);

module.exports = app;