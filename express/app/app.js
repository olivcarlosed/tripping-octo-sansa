
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var books = require('./routes/books');

// db
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/draftlerdb', {auto_reconnect: true});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/helloworld', routes.helloworld);
app.get('/users', user.list);
app.get('/booklisting', routes.books(db));

app.get('/books', books.findAll);
app.get('/books/:id', books.findById);
app.post('/books', books.addBook);
app.put('/books/:id', books.updateBook);
app.delete('/books/:id', books.deleteBook);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
