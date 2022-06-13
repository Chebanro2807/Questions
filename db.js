const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 80;
const app = express();
app.use(cors());


app.use(bodyParser.json());

const uri = "mongodb+srv://admin:admin@cluster0.o7ase.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = client.db("interview-questions").collection("list");

app.get("/list", (req, res) => {
    client.connect(async (err) => {
        res.send(await collection.find({}).toArray());
        client.close();
    });
});


app.patch("/status", (req, res) => {
    client.connect(async (err) => {
        const { id, status } = req.body;
        const updateResult = collection.updateOne({ _id: ObjectId(id) }, { $set: { status: status } });
        res.send(await updateResult);
        client.close();
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
