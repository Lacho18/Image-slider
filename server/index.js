const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const PORT = 5000;

const DBFunctions = require("./DBFunctions.js");

let variable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

app.use(cors());
app.use(bodyParser.json());

app.get("/imagesData", async (req, res) => {
    DBFunctions.getAllImages(res);
});

app.post("/rateData", async (req, res) => {
    const recievedData = req.body;
    let avgRate = await DBFunctions.SetRating(recievedData);
    let answer = {
        avg : avgRate.toFixed(2)
    }
    res.json(answer);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
