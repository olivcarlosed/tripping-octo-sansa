var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('draftlerdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'draftlerdb' database");
        db.collection('books', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'books' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving book: ' + id);
    db.collection('books', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('books', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addBook = function(req, res) {
    var book = req.body;
    console.log('Adding book: ' + JSON.stringify(book));
    db.collection('books', function(err, collection) {
        collection.insert(book, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateBook = function(req, res) {
    var id = req.params.id;
    var book = req.body;
    console.log('Updating book: ' + id);
    console.log(JSON.stringify(book));
    db.collection('books', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, book, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating book: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(book);
            }
        });
    });
}

exports.deleteBook = function(req, res) {
    var id = req.params.id;
    console.log('Deleting book: ' + id);
    db.collection('books', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var books = [
   {
       "id": 1,
       "title": "THe Wolf Gang",
       "description": "labore exercitation sit voluptate eiusmod aute ullamco ullamco elit enim officia esse anim ullamco exercitation consequat id nisi id enim nulla commodo",
       "picture": "css/img/bookimage.jpg",
       "chapter": 4,
       "comments": 10,
       "stage": "voting",
       "rating": 5,
       "remainingtime": "60"
   },
   {
       "id": 2,
       "title": "A Clash of Kings",
       "description": "We see most events through the eyes of the sons and daughters of the Stark family, the once and future Kings of the North",
       "picture": "css/img/download.jpg",
       "chapter": 3,
       "comments": 10,
       "stage": "submittion",
       "remainingtime": "20",
       "rating": 2
   },
   {
       "id": 3,
       "title": "quis",
       "description": "aliquip veniam id reprehenderit dolore ut qui mollit labore consequat aute elit ullamco incididunt qui culpa enim adipisicing nisi incididunt anim magna",
       "picture": "http://lorempixel.com/190/120/food",
       "chapter": 1,
       "comments": 10,
       "stage": "voting",
       "remainingtime": "50",
       "rating": 3
   },
   {
       "id": 70,
       "title": "tempor",
       "description": "consequat proident reprehenderit enim pariatur voluptate ipsum et ea duis amet nisi anim culpa voluptate aliqua cupidatat labore anim dolore id eiusmod",
       "picture": "http://lorempixel.com/190/120/fashion",
       "chapter": 1,
       "comments": 152,
       "stage": "voting",
       "remainingtime": "25",
       "rating": 3
   },
   {
       "id": 4,
       "title": "Lorem",
       "description": "nostrud occaecat cillum non duis commodo aliquip duis ea eiusmod in ad esse amet nostrud ipsum laboris non incididunt in esse voluptate",
       "picture": "http://lorempixel.com/190/120/nature",
       "chapter": 1,
       "comments": 19,
       "stage": "submittion",
       "remainingtime": "78",
       "rating": 5
   },
   {
       "id": 5,
       "title": "qui",
       "description": "culpa sunt anim deserunt voluptate dolore enim officia non proident velit labore Lorem in reprehenderit eu ipsum ad Lorem non anim in",
       "picture": "http://lorempixel.com/190/120/transport",
       "chapter": 1,
       "comments": 10,
       "stage": "submittion",
       "remainingtime": "20",
       "rating": 5
   },
   {
       "id": 6,
       "title": "laboris",
       "description": "magna laborum incididunt ullamco nostrud voluptate proident magna enim proident tempor enim mollit excepteur id adipisicing do esse tempor commodo ad ad",
       "picture": "http://lorempixel.com/190/120/city",
       "chapter": 1,
       "comments": 6,
       "stage": "voting",
       "remainingtime": "36",
       "rating": 2
   },
   {
       "id": 7,
       "title": "et",
       "description": "aute deserunt aliquip consectetur enim magna elit nostrud adipisicing laboris cupidatat culpa proident sit pariatur tempor consectetur Lorem mollit nisi eu proident",
       "picture": "http://lorempixel.com/190/120/business",
       "chapter": 1,
       "comments": 54,
       "stage": "voting",
       "remainingtime": "50",
       "rating": 3
   },
   {
       "id": 8,
       "title": "nisi",
       "description": "ipsum irure consectetur incididunt ex occaecat exercitation enim mollit ipsum id id velit ex culpa dolore nostrud duis deserunt et fugiat enim",
       "picture": "http://lorempixel.com/190/120/sport",
       "chapter": 1,
       "comments": 16,
       "stage": "submittion",
       "remainingtime": "50",
       "rating": 1
   },
   {
       "id": 9,
       "title": "non",
       "description": "ea voluptate deserunt ea id qui sint ullamco reprehenderit qui mollit incididunt labore mollit esse sint voluptate deserunt voluptate voluptate consequat esse",
       "picture": "http://lorempixel.com/190/120/food",
       "chapter": 1,
       "comments": 10,
       "stage": "voting",
       "remainingtime": "42",
       "rating": 3
   }
];

    db.collection('books', function(err, collection) {
        collection.insert(books, {safe:true}, function(err, result) {});
    });

};