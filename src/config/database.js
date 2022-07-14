const mongoose = require("mongoose");
const { initialize } = require("mongoose-auto-increment");

const URL = process.env.MONGO_URL;

// const OPEN_EVENT = "open";
// const ERROR_EVENT = "error";
const CONNECTED = "connected";
const DISCONNECTED = "disconnected";
let db;
(async () => {
  try {
    db = mongoose.createConnection(URL);
  } catch (e) {
    console.log(`Error while connecting to DB ${e}`);
  }
})();

initialize(db);
db.on(CONNECTED, () => {
  console.log(`Successfully connected to db at ${URL}`);
});
db.on(DISCONNECTED, () => {
  console.log(`Connection error while connecting at ${URL}`);
});

module.exports.db = db;
