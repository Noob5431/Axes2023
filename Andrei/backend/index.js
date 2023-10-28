
// To connect with your mongoDB database
const mongoose = require('mongoose');



main().catch((err) => console.log(err));
async function main() {
    mongoose.connect('mongodb://localhost:27017/', {
        dbName: 'Cars',
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connected to database");
}
//Schemas
const LicenceSchema = new mongoose.Schema({
    licencePlate: {
        type: String,
        required: true,
    },
    carType: {
        type: String,
        required: true,
    }
});
const LicencePlate = mongoose.model('NumberPlate', LicenceSchema);
LicencePlate.createIndexes();
const CarTypeSchema = new mongoose.Schema({
    cartype:{
        type: String,
        required:true,
    },
    allowed:{
        type: Boolean,
        required:true,
    }
});
const CarType = mongoose.model('bannedcar', CarTypeSchema);
CarType.createIndexes();
 
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
     
    // If you see App is working means
    // backend working properly
});
 
app.post("/register", async (req, resp) => {
    car = await LicencePlate.find(req.body).exec();
    if(car && car[0])
    {
        allowed = await CarType.find({cartype:car[0].carType}).exec();
        resp.send(allowed[0].allowed);
    }
    else
    {
        resp.send("2");
    }
});
app.listen(5000);
