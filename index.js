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


app.get('/openRideAlongs', function(req, res){
    fs.readFile('activeRideAlongs.json', (err, data)=>{
        res.end(data);
    })
});

app.post('/deleteRideAlong', function(req, res){
    var holder = [],
        toBeDeleted = req.body,
        successful = false;
    //console.log(toBeDeleted);
    fs.readFile('activeRideAlongs.json', (err, data)=>{
        if(err)throw err;
        holder= JSON.parse(data);
        for(var i=0;i<holder.length;i++){
            //console.log(holder[i]);
            if(holder[i].name==toBeDeleted.name&&holder[i].startDate==toBeDeleted.startDate&&holder[i].endDate==toBeDeleted.endDate&&holder[i].region==toBeDeleted.region){
                holder.splice(i, 1);
                i=holder.length;
                successful=true;
            }
        }
        fs.writeFile('activeRideAlongs.json', JSON.stringify(holder));
        res.end(JSON.stringify({success: successful}));
    })    
});

app.post('/changeRAStatus', function(req, res){
    var holder = [],
        toBeChanged=req.body,
        successful=false;
    fs.readFile('activeRideAlongs.json', (err, data)=>{
        if(err)throw err;
        holder=JSON.parse(data);
        for(var i=0;i<holder.length;i++){
            if(holder[i].name==toBeChanged.name&&holder[i].startDate==toBeChanged.startDate&&holder[i].endDate==toBeChanged.endDate&&holder[i].region==toBeChanged.region){
                holder[i].status=toBeChanged.status;
                i=holder.length;
                successful=true;
            }
        }
        if(successful)fs.writeFile('activeRideAlongs.json', JSON.stringify(holder));
        res.end(JSON.stringify({success: successful}));
    })
});


app.post('/formSubmit', function(req, res){
    
    //Here would be the logic in which we decide what emails go out to who
    var emails = [
        "wesley.young.portfolio@gmail.com"
        //"8016633893@vtext.com"
    ], storeObj=[];

    var name = req.body.name,
        status= req.body.status,
        employeeEmail = req.body.email,
        region = req.body.region,
        province = req.body.provinceName,
        county = req.body.countyName,
        startDateObj = new Date(req.body.startDate),
        endDateObj = new Date(req.body.endDate),
        department = req.body.department,
        notes = req.body.notes,
        phone = req.body.phone,
        created = new Date(req.body.creationDate),
        counter = 0;

    fs.readFile('activeRideAlongs.json', (err,data)=>{
        storeObj=JSON.parse(data);
        storeObj.push({
            name: name,
            status: status,
            email: employeeEmail, 
            region: region, 
            province: province, 
            county: county, 
            startDate: startDateObj, 
            endDate: endDateObj, 
            notes: notes,
            department: department,
            phone: phone, 
            notified: emails,
            creationDate: created
        });
        fs.writeFile('activeRideAlongs.json', JSON.stringify(storeObj))
    });

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
                return console.log(err)
            }else{
                console.log('message sent! ' + info.response);
                if(emails[counter]!==undefined){
                    sendEmail(emails[counter]);
                }else{
                    console.log("All emails sent! Recievers were " + emails.join(" "))
                }
            }

        });
    }

    if(emails.length!==0)sendEmail(emails[counter]);
    
    res.end();
});




// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

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