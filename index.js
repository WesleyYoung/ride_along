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

var server = http.createServer(app);

var io = require('socket.io').listen(server);

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport("smtps://xactridealong%40gmail.com:XactWare4$6^8*@smtp.gmail.com");

const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

var mongoUrl = "mongodb://localhost:27017/exampleDb";

MongoClient.connect(mongoUrl, function(error, db) {
    if(error)throw error;
    console.log("We are connected to Mongo");
    db.createCollection('rideAlongs', function(err) {
        if(err)throw err;
        console.log("'Ride-Along' collection worked");
        db.createCollection('companies', function(err){
            if(err)throw err;
            console.log("'Companies' collection worked");
        })
    });
});

app.get('/rideAlongById/:id', (req, res)=>{
    var id = req.params.id;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('rideAlongs');
        collection.findOne({id: id}, (err, item)=>{
            if(err)throw err;
            res.end(JSON.stringify(item));
        })
    });
});

app.get('/openRideAlongs', function(req, res){
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('rideAlongs');
        collection.find().toArray((err,items)=>{
            if(err)throw err;
            res.end(JSON.stringify(items));
        })
    });
});

app.get('/getCompanies', (req, res)=>{
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('companies');
        collection.find().toArray((err,items)=>{
            if(err)throw err;
            res.end(JSON.stringify(items));
        })
    });    
});

app.post('/deleteRideAlong', function(req, res){
    var toBeDeleted = req.body;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('rideAlongs');
        collection.remove({
            id: toBeDeleted.id
        }, {w:1}, (err,result)=>{
            if(err)throw err;
            res.end(JSON.stringify({success: true}))
        })
    });
});

app.post('/changeRAStatus', function(req, res){
    var toBeChanged=req.body;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('rideAlongs');
        collection.update({
            name: toBeChanged.name,
            email: toBeChanged.email,
            province: toBeChanged.province,
            region: toBeChanged.region,
            county: toBeChanged.county
        }, {$set: {status: toBeChanged.status}}, {w:1}, (err,result)=>{
            if(err)throw err;
            res.end(JSON.stringify({success: true}))
        })
    });
});

app.post('/inviteSpecific', function(req, res){



});


app.post('/formSubmit', function(req, res){
    
    //Here would be the logic in which we decide what emails go out to who
    var emails=[],
        companyIds=[],
        contactIds=[],
        counter=0;
    
    var rideAlong = req.body,
        startDateObj = new Date(rideAlong.startDate), 
        endDateObj = new Date(rideAlong.endDate);

    MongoClient.connect(mongoUrl, function(error, db) {
        if (error)throw error;
        var raCollection = db.collection('rideAlongs'),
            coCollection = db.collection('companies');
        
        coCollection.find().toArray((err,items)=>{
            if(err)throw err;
            for(var i=0;i<items.length;i++){
                if(items[i].province==rideAlong.province&&items[i].county==rideAlong.county){
                    rideAlong.notified.push(items[i].id);
                    coCollection.update({id: items[i].id}, {$push: {notifiedRideAlongs: rideAlong.id}});
                    for(var j=0;j<items[i].contacts.length;j++){
                        emails.push(items[i].contacts[j].email);
                        contactIds.push(items[i].contacts[j].id);
                        companyIds.push(items[i].id);
                    }
                }
            }
            raCollection.insert(rideAlong, {w: 1}, (err, result)=> {
                if (err)throw err;
                console.log("Added Ride Along");
                if(emails.length!==0)sendEmail(emails[counter]);
            })
        });
    });

    function sendEmail(em){
        var mailOptions = {
            from: '"Xactware Scheduling App" <xactwaretraining@xactware.com>',
            to: em,
            subject: "Ride Along Available",
            text: `
                Hello! Xactware certified trainer ${rideAlong.name} is available to schedule a ride along with from ${startDateObj.legibleDate()} to ${endDateObj.legibleDate()}
            `,
            html: `
                <h2 style="color: black">Hello!</h2>
                <p style="color: black">Xactware certified trainer ${rideAlong.name} is available to schedule a ride along with you!</p> 
                <div >
                    <p style="color: red">
                    <strong style="color: black">When </strong> ${startDateObj.legibleDate()} to ${endDateObj.legibleDate()}
                    <br>
                    <strong style="color: black">Where </strong> ${rideAlong.county.regionToNormal()}, ${rideAlong.province.regionToNormal()} - ${rideAlong.region.regionToNormal()} 
                    </p>
                </div>
                <p>${rideAlong.notes}</p>
                
                <div>
                    Copy this link into your browser to respond to the ride-along
                    
                    
                    localhost:8001/#/respond?id=${rideAlong.id}&companyId=${companyIds[counter]}&contactId=${contactIds[counter]}
                </div>
                
                <a href="localhost:8001/#/respond?id=${rideAlong.id}&companyId=${companyIds[counter]}&contactId=${contactIds[counter]}">Click Here To Respond To This Ride-Along</a>
                      
                <h4 style="color: green">You may contact ${rideAlong.name} at ${rideAlong.email}</h4>  
                `
        };
        counter++;
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err.response.split("<")[1].split(">")[0]);
            }
            //console.log('message sent! ' + info.response);
            if(emails[counter]!==undefined){
                sendEmail(emails[counter]);
            }else{
                console.log("All emails sent! Receivers were: " + emails.join(" "));
                res.end();
            }
        });
    }
});

app.post('/resendNotifications', function(req, res){
    var emails = req.body.notified,
        name = req.body.name,
        employeeEmail = req.body.email,
        region = req.body.region,
        province = req.body.province,
        county = req.body.county,
        startDateObj = new Date(req.body.startDate),
        endDateObj = new Date(req.body.endDate),
        department = req.body.department,
        notes = req.body.notes,
        phone = req.body.phone,
        counter = 0;


    function sendEmail(em){
        counter++;
        var mailOptions = {
            from: '"Xactware Scheduling App" <xactwaretraining@xactware.com>',
            to: em,
            subject: "Ride Along Available",
            text: `
                Hello! Xactware certified trainer ${req.body.name} is available to schedule a ride along with from ${startDateObj.legibleDate()} to ${endDateObj.legibleDate()}
            `,
            html: `
                <h2 style="color: black">Hello!</h2>
                <p style="color: black">Xactware certified trainer ${name} is available to schedule a ride along with you!</p> 
                <div >
                    <p style="color: red">
                    <strong style="color: black">When </strong> ${startDateObj.legibleDate()} to ${endDateObj.legibleDate()}
                    <br>
                    <strong style="color: black">Where </strong> ${county.regionToNormal()}, ${province.regionToNormal()} - ${region.regionToNormal()} 
                    </p>
                </div>
                <p>${notes}</p>
                      
                <h4 style="color: green">You may contact ${name} at ${employeeEmail}</h4>  
                `
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                res.error(err);
                return console.log(err)
            }else{
                console.log('message sent! ' + info.response);
                if(emails[counter]!==undefined){
                    sendEmail(emails[counter]);
                }else{
                    console.log("All emails sent! Recievers were " + emails.join(" "))
                    res.end();
                }
            }

        });
    }

    if(emails.length!==0)sendEmail(emails[counter]);

});

app.post('/addCompany', (req, res)=>{
    var com = req.body;
    MongoClient.connect(mongoUrl, function(error, db) {
        if (error)throw error;
        var collection = db.collection('companies');
        collection.insert(com, {w: 1}, (err, result)=> {
            if (err)throw err;
            console.log("Added Company");
            res.end();
        })
    });
});

app.post('/removeCompany', (req, res)=>{
    var toBeDeleted = req.body;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('companies');
        collection.remove({id: toBeDeleted.id}, {w:1}, (err,result)=>{
            if(err)throw err;
            res.end(JSON.stringify({success: true}))
        })
    });
});

app.post('/addContact', (req, res)=>{
    var contact = req.body.contact,
        id = req.body.id;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('companies');
        collection.update({id: id}, {$push: {contacts: contact}}, (err,result)=>{
            if(err)throw err;
            collection.findOne({id: id}, (err, item)=>{
                if(err)throw err;
                res.end(JSON.stringify({success: true, updated: item}))
            });
        })
    });
});

app.post('/removeContact', (req, res)=>{
    var companyId = req.body.companyId,
        contactId = req.body.contactId;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var collection = db.collection('companies');
        collection.update({id: companyId}, {
            $pull: {contacts: {id: contactId}}
        }, (err, result)=>{
            if(err)throw err;
            collection.findOne({id: companyId}, (err, item)=>{
                if(err)throw err;
                res.end(JSON.stringify({success: true, updated: item}))
            })    
        })
    });
});


app.post('/acceptance/:id/:companyId/:contactId', (req, res)=>{
    console.log("Received!");
    var id = req.params.id,
        companyId = req.params.companyId,
        contactId = req.params.contactId,
        rap = req.body.rap,
        manager = req.body.manager;
    MongoClient.connect(mongoUrl, function(error, db) {
        if(error)throw error;
        var RACollection = db.collection('rideAlongs');
        RACollection.update({id: id}, {$set: {status: 'ACCEPTED', accepted: {company: companyId, contact: contactId, rap: rap, manager: manager}}}, (err,result)=>{
            if(err)throw err;
            var COCollection = db.collection('companies');
            COCollection.update({id: companyId}, {$push: {acceptedRideAlongs: id}}, (err, result)=>{
                if(err)throw err;
                RACollection.findOne({id: id}, (err, item)=>{
                    if(err)throw err;
                    res.end(JSON.stringify({success: true, updated: item}))
                });
            })
        })
    });
});



// verify connection configuration
function verifyTransporter(){
    transporter.verify(function(error, success) {
        if (error) {
            if(error.code=='ECONNRESET'){
                console.log('ECONNRESET Error thrown, trying to verify again...');
                verifyTransporter();
            }else{
                throw error;
            }
        } else {
            console.log('Server is ready to take our messages');
        }
    });
}
verifyTransporter();

Date.prototype.legibleDate=function(){
    var input = this;
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var day = input.getDate(),
        month = input.getMonth(),
        year = input.getFullYear(),
        suffix = day=="1"||day=="21"||day=="31"?"st":day=="2"||day=="22"?"nd":day=="3"||day=="23"?"rd":"th";

    return monthNames[month] + " " + day + suffix + " " + year;
};

String.prototype.regionToNormal=function(){
    var input = this,
        inpArr=input.split('_'),
        out = [];
        for(var i=0;i<inpArr.length;i++){
            out.push(inpArr[i][0].toUpperCase()+inpArr[i].split("").splice(1, inpArr[i].length-1).join("").toLowerCase());
        }
        return out.join(" ");
};


var port = 8000;
server.listen(port, function() {
    console.log(`App listening on port ${port}...`);
});