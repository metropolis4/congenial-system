var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/ReactComments');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

app.post('/login', indexController.login);

var server = app.listen(9742, function() {
	console.log('Express server listening on port ' + server.address().port);
});
