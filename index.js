/**
 * Created by I97143 on 6/8/2016.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var async = require('async');
var http = require('http');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'username',
        pass: 'password'
    }
}));
var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.post('/formSubmit', function(req, res){
    console.log(req.body);
    res.end();
});

var port = 3344;
server.listen(port, function() {
    console.log(`App listening on port ${port}...`);
});

// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});