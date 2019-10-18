// Require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require('axios');
var cheerio = require('cheerio');

// Sets up our port to be either the host's designated port, or 3000
let PORT = process.env.PORT || 3000;

// Instantiate our Express App
let app = express();

// Set up an Express Router
let router = express.Router();

// Designates our public folder as a static directory
app.use(express.static(__dirname + '/public'));

// Require out toutes file to pass out touter object
require('./config/routes')(router);

// Connect Handlebars to our Express app
app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Have every request go through our router middleware
app.use(router);
mongoose.connect('mongodb://localhost:27017/Notification', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Connect mongoose to our db
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // If no error throw success message
  else {
    console.log('Mongoose connection is succeful!');
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log('Listen on port:' + PORT);
});
