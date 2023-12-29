const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const PORT = 5000;

const DBFunctions = require("./DBFunctions.js");

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
