const { MongoClient } = require('mongodb');
const fs = require("fs");

const localhost = "mongodb://127.0.0.1:27017";
const dbName = "ImageGrade";
const collectionName = "ComputerImages";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
    useUnifiedTopology: true
};

const data = fs.readFileSync("./dummyData/imagesData.json", "utf-8");
let jsonData = JSON.parse(data);

async function connection() {
    let client;
    try {
        client = await MongoClient.connect(localhost, options);
    } catch (err) {
        console.error(err);
        return;
    }
    console.log("Connection complete");

    const collection = client.db(dbName).collection(collectionName);

    let result = await collection.insertMany(jsonData);

    console.log(result.insertedCount);

    client.close();
}

async function insertRateObjects() {
    let client;
    try {
        client = await MongoClient.connect(localhost, options);
    } catch (err) {
        console.error(err);
        return;
    }
    console.log("Connection complete");

    const collection = client.db(dbName).collection("ImageRates");

    for(let i = 0; i < jsonData.length; i++) {
        let objectToInsert = {
            id : i + 1,
            rates : []
        }

        await collection.insertOne(objectToInsert);
    }

    client.close();
}

connection();
