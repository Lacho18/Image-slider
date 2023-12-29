const { MongoClient } = require('mongodb');

const localhost = "mongodb://127.0.0.1:27017";
const dbName = "ImageGrade";
const collectionName = "ComputerImages";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
    useUnifiedTopology: true
};

async function getAllImages(res) {
    let client;
    try {
        client = await MongoClient.connect(localhost, options);
        console.log("Connection complete");

        const collection = client.db(dbName).collection(collectionName);

        const result = await collection.find({}).toArray();

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            client.close();
        }
    }
}

async function SetRating(data) {
    const ratesCollectionName = "ImageRates";
    let client;
    try {
        client = await MongoClient.connect(localhost, options);

        let collection = client.db(dbName).collection(ratesCollectionName);

        await collection.updateOne({
            id : data.hero
        }, {
            $push : {rates : data.rating}
        });

        const agregation = [
            {
                $match : {
                    id : data.hero
                }
            },
            {
                $project : {
                    avgValue : {$avg : '$rates'}
                }
            }
        ];

        const result = await collection.aggregate(agregation).toArray();

        return result[0].avgValue;
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            client.close();
        }
    }
}

module.exports = {getAllImages, SetRating};