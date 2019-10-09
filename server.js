// Require our dependencies
const express = require('express');

// Sets up our port to be either the host's designated port, or 3000
let PORT = process.env.PORT || 3000;

// Instantiate our Express App
let app = express();

// Set up an Express Router
let router = express.Router();

// Designates our public folder as a static directory
app.use(express.static(__dirname + '/public'));

// Have every request fo through out router middleware
app.use(router);

// Listen on the port
app.listen(PORT, function() {
    console.log('Listen on port:' + PORT);
});