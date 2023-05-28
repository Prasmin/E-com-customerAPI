import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);

    const con = await mongoose.connect(process.env.MONGO_CLIENT);

    con?.connections
      ? console.log("db has succesfully connected")
      : console.log("Unable to connect DB");
    return con;
  } catch (error) {
    console.log(error);
  }
};
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

let client;
let clientPromise;

const options = {};

const uri =
  "mongodb+srv://Admin:Admin123@cluster0.bqyanz2.mongodb.net/Ecom_user?retryWrites=true&w=majority";

if (!uri) {
  throw new Error("Please add mongo uri to .env file.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
