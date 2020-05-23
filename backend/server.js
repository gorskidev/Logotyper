const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const keys = require('./config/keys');
const passport = require('passport');
const dbRoute = keys.mongoURI;

const API_PORT = 3001;

const client = new MongoClient(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  //const collection = client.db("test").collection("datas");
  // perform actions on the collection object
  client.close();
});

mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database successfully connected.');
    }, error => {
        console.log("Database could not be connected: " + error);
    }
);

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
const app = express();
app.use(cors());
app.use('/imgs', express.static('imgs'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
require('./config/passport')(passport); 

// append /api for our http requests
const api = require('./routes/api');
app.use('/api', api);

const upload = require('./routes/upload');
app.use('/upload', upload);

const chat = require('./routes/chat');
app.use('/chat', chat)

/* Files upload */
app.use(fileUpload({
  createParentPath: true
}));

app.use((req, res, next) => {
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
})

app.use((err, req, res, next) => {
  console.log(err.message);
  !err.statusCode ? err.statusCode = 500 : true;
  res.status(err.statusCode).send(err.message);
})

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
