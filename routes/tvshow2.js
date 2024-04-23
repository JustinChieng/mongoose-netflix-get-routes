const express = require("express");

// create express router for movies
const router = express.Router();

// load all the controller functions
const {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
} = require("../controllers/show");

// load all the models
const Show = require("../models/show");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    const shows = await getShows(genre, rating, premiere_year);
    res.status(200).send(shows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await getShow(req.params.id);
    res.status(200).send(show);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  // const title = req.body.title;
  // const creator = req.body.creator;
  // const premiere_year = req.body.premiere_year;
  // const end_year = req.body.end_year;
  // const seasons = req.body.seasons;
  // const genre = req.body.genre;
  // const rating = req.body.rating;
  const { title, creator, premiere_year, end_year, seasons, genre, rating } =
    req.body;
  try {
    const newShow = await addShow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(newShow);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { title, creator, premiere_year, end_year, seasons, genre, rating } =
    req.body;
  const show_id = req.params.id;
  try {
    const updatedShow = await updateShow(
      show_id,
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(updatedShow);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const show_id = req.params.id;
  try {
    await deleteShow(show_id);
    res.status(200).send({ message: `Show #${show_id} has been deleted` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
