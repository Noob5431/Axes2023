
// To connect with your mongoDB database
const mongoose = require('mongoose');
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");
const multer = require('multer');
const bodyParser = require('body-parser');
const fu=require("express-fileupload")
const sharp = require('sharp');

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
app.use(bodyParser.json());
const cors = require("cors");
const { debug } = require('console');
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
var upload = multer({ dest: 'uploads/' });
app.get("/", (req, resp) => {
    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
     
    // If you see App is working means
    // backend working properly
});
 
app.post("/register",upload.single('image'), async (req, resp) => {
    
    let image_path = req.file.path;
    // let image_path = "uploads/.jpg";
    let output="uploads/output.jpg";
    await sharp(image_path).resize({width: 1024, height: 768}).toFile(output);
    image_path=output;

    let body = new FormData();
    body.append("upload", fs.createReadStream(image_path));
    let json;
    console.log("start fetching");
    try {
        const response = await fetch("https://api.platerecognizer.com/v1/plate-reader/", {
            method: "POST",
            headers: {
                Authorization: "Token 2915054b104ddd3cd1325182a2a29154e9af9234",
            },
            body: body,
        });
        json = await response.json();
    } catch (err) {
        console.log(err);
    }
    console.log("end fetching");
    console.log(json);
    if(json.results == undefined ||json.results.length == 0 ||json.results[0].score == undefined|| json.results[0].score < 0.8)
    {
        resp.send("2");
        return;
    }
    let plate_name = json.results[0].plate;
    car = await LicencePlate.find({licencePlate:plate_name}).exec();
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
