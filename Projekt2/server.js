
const express = require('express');
const bodyParser= require('body-parser');
const mongodb = require('mongodb');
const session = require('express-session');
const pug = require('pug');



var sdb;
const dbname = '8kusm';
const host = '172.20.44.25'; 
const url = 'mongodb://8kusm:pass8kusm@' + host + '/' + dbname;
const app = express();
const port = 2115;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
   secret: 'some-secret',
   resave: true,
   saveUninitialized: true
}));


var auth = function(req, res, next) {
   if (req.session && req.session.user === "user" && req.session.admin)
     return next();
   else
     return res.status(401).send("Zaloguj się aby to zobaczyć.");
 };


app.listen(port,function() {
   console.log('listening on ' + port);
})


app.get('/main.css', function(req,res) {
   res.sendFile(__dirname + '/main.css');
})

app.get('/favicon.ico', function(req,res) {
   res.sendFile(__dirname + '/favicon.ico');
})

app.get('/ajax.js', function(req,res) {
   res.sendFile(__dirname + '/ajax.js');
})

app.get('/storage.js', function(req,res) {
   res.sendFile(__dirname + '/storage.js');
})

app.get('/', function(req,res) {
   result = pug.renderFile('templates/home.pug');
   res.status(200).send(result);
})

app.get('/chart', auth, function(req,res) {
   var data;
   result = pug.renderFile('templates/chart.pug');
   res.status(200).send(result);
})

app.get('/chart_data', auth, function(req,res) {
   var cursor = sdb.collection('bug').find().toArray(function(err, db_results) {
      if (err) return console.log(err);
      res.status(200).send(db_results);
   })
})

app.get('/login', function(req,res) {
   result = pug.renderFile('templates/login.pug');
   res.status(200).send(result);
})

app.post('/login', function(req,res) {
   console.log(req.body);
   if (!req.body.username || !req.body.pass) {
      res.status(401).send("login failed");
   } else if(req.body.username === "user" && req.body.pass === "pass") {

      req.session.user = "user";
      req.session.admin = true;

      mongodb.MongoClient.connect(url, function(err, client) {
         if (err) return console.log(err)
         sdb = client.db(dbname);
         console.log('Connect OK');
      })
      
      res.status(200).send("login successful");
   } else {
      res.status(401).send("login failed");
   }
})

app.get('/logout', function(req,res) {
   req.session.destroy();
   console.log("logout successful");
   result = pug.renderFile('templates/documentation.pug');
   res.status(200).send(result);
})

app.get('/input', function(req,res) {
   result = pug.renderFile('templates/input.pug');
   res.status(200).send(result);
})


app.post('/input', function( req,res ) {
   console.log(req.body);
   if(req.session.admin){
      sdb.collection('bug').insertOne(req.body,function(err,result) {
         if (err) return console.log(err);
         console.log('Rekord dodany do bazy');
         res.end('{"inserted record":"' + result.insertedCount + '"}');
      })
   } else {

      res.status(401).send("Zaloguj się aby to wysłać.");
   }
})

app.get('/results', function(req, res) {
   if(req.session.admin){
      var cursor = sdb.collection('bug').find().toArray(function(err, db_results) {
         if (err) return console.log(err);
         console.log(db_results);
         result = pug.renderFile('templates/results.pug', {db_results});
         res.status(200).send(result);
      })
   } else {
      res.status(401).send("Zaloguj się aby to zobaczyć.");
   }
})

app.get('/results_offline', function(req, res) {
   if(!req.session.admin){
      result = pug.renderFile('templates/results_offline.pug');
      res.status(200).send(result);
   }else {
      res.status(401).send("Wyloguj się aby zobaczyć wyniki offline.");
   }
})

app.get('/docs', function(req,res) {
   result = pug.renderFile('templates/documentation.pug');
   res.status(200).send(result);
})