const mongoose = require("mongoose");
mongoose.connect("mongodb://jason:temp123@ds255253.mlab.com:55253/society123");
var Society = require("./models/society");


var societyData = {
    name: "Overdose Prevention Society",
    address: "58 E Hastings St, Vancouver, BC V6A 1N1",
    phone: "778-423-8293",
    latitude: "49.2814° N",
    longitude: "123.1028° W"
}

Society.create(societyData, (err) => {
    if (err) {
        console.log(err);
    } else {
        // created
    }
});

Society.find({}, (err, societies) => {
    if (err) {

    } else {
        // societies contain list of all prevention centres
        console.log(societies);
    }
});


 var name = "Overdose Prevention Society"
var newAddress = "2053 Main Mall, Vancouver, BC V3F 9F2"
Society.findOneAndUpdate({"name": name}, {"address": newAddress}, (err, society) => {
    if (err) {
        console.log(err);
    } else {
        //
    }
});

Society.findOneAndRemove({"name": name}, (err) =>{
    if (err) {
        //
    } else {
        // removed successfully
    }
});

