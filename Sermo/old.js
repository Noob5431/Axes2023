const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

let image_path = "car.jpg";
let body = new FormData();
body.append("upload", fs.createReadStream(image_path));
// Or body.append('upload', base64Image);
//body.append("regions", "us-ca"); // Change to your country
fetch("https://api.platerecognizer.com/v1/plate-reader/", {
  method: "POST",
  headers: {
    Authorization: "Token 2915054b104ddd3cd1325182a2a29154e9af9234",
  },
  body: body,
})
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => {
    console.log(err);
  });