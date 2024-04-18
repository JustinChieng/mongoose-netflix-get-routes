const express = require("express");
const mongoose = require("mongoose");

const app = express();

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

//Start the server
app.listen(5000, () => {
    console.log("Server is runnning at http://localhost:5000");
});