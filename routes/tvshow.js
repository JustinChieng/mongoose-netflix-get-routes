const express = require("express");

const router = express.Router();

const Tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    let tvshows = [];
    if (genre) {
      tvshows = await Tvshow.find({ genre: genre });
    } else if (rating) {
      tvshows = await Tvshow.find({ rating: { $gt: rating } });
    } else if (premiere_year) {
      tvshows = await Tvshow.find({ premiere_year: { $gt: premiere_year } });
    } else {
      tvshows = await Tvshow.find();
    }

    res.status(200).send(tvshows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tvshow = await Tvshow.findById(req.params.id);
    res.status(200).send(tvshow);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
