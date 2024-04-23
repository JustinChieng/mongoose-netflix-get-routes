const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware to handle JSON request
app.use(express.json());

//connect to MongoDb
mongoose.connect("mongodb://127.0.0.1:27017/netflix")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

//Route

const tvshowRouter = require("./routes/tvshow")

app.use("/tvshows",tvshowRouter);

const movieRouter = require("./routes/movie")

app.use("/movies", movieRouter);

//Start the server
app.listen(5000, () => {
    console.log("Server is runnning at http://localhost:5000");
});