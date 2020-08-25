const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function ConnectMongoDb() {
  await mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ilqtt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => console.log("Connected mongodb"))
    .catch((err) => console.log(err));
}

module.exports = ConnectMongoDb;
