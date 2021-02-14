require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Configure Express
const PORT = process.env.PORT || 8080;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set up Routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Mongoose Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Start the app
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});