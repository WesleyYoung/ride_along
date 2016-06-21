/**
 * Created by I97143 on 6/8/2016.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var async = require('async');
var http = require('http');
var server = http.createServer(app);

var io = require('socket.io').listen(server);


var port = 3343;
server.listen(port, function() {
    console.log(`App listening on port ${port}...`);
});