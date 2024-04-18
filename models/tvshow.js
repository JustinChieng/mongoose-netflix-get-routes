const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//setup the schema
const tvshowSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    premiere_year: {
        type: Number,
        required: true,
    },
    end_year: Number,
    season: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
});

//convert the schema into a model
const Tvshow = model ("Tvshow",tvshowSchema);
module.exports = Tvshow; 