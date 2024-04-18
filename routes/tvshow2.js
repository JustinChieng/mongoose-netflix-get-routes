//Sir nathan answer for combo query

const express = require("express");

// create express router for movies
const router = express.Router();

// load all the models
const Show = require("../models/show");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    let filters = {};
    if (genre) {
      filters.genre = genre;
    }
    if (rating) {
      filters.rating = { $gt: rating };
    }
    if (premiere_year) {
      filters.premiere_year = { $gt: premiere_year };
    }
    const shows = await Show.find(filters);
    res.status(200).send(shows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    res.status(200).send(show);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
// export default router;
