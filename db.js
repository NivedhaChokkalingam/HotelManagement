const mongoose = require("mongoose");
var mongoURL =
  "mongodb+srv://nivedha:nivedhavarun@cluster0.dwqdq.mongodb.net/pondirooms";
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
var connection = mongoose.connection;
connection.on("error", () => {
  console.log("Mongo DB Connecion failed");
});
connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});
module.export = mongoose
