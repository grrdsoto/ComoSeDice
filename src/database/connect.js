const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://santoshernandezr:1206825Rs@comosedicecluster.gpnkhsv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        await listDatabases(client);
        await getUsers(client);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getUsers(client) {
    console.log("Getting users")
    client.connect(uri, function(err, db) {
        console.log("In client");
        if (err) throw err;
        var dbo = db.db("ComoSeDiceGame");
        dbo.collection("Users").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        })
    })
};

run().catch(console.dir);