const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
  console.error("MongoDb connection string is missing");
  process.exit(1);
}

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB Connected Successfully...");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error..", error);
  });
