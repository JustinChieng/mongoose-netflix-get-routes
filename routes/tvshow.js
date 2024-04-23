const express = require("express");

const {
  getTvShows,
  addTvShow,
  updateTvShow,
  deleteTvShow,
} = require("../controllers/tvshow")

const router = express.Router();

const Tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  // try {
  //   const genre = req.query.genre;
  //   const rating = req.query.rating;
  //   const premiere_year = req.query.premiere_year;
  //   let tvshows = [];
  //   if (genre) {
  //     tvshows = await Tvshow.find({ genre: genre });
  //   } else if (rating) {
  //     tvshows = await Tvshow.find({ rating: { $gt: rating } });
  //   } else if (premiere_year) {
  //     tvshows = await Tvshow.find({ premiere_year: { $gt: premiere_year } });
  //   } else {
  //     tvshows = await Tvshow.find();
  //   }

  //   res.status(200).send(tvshows);
  // } catch (error) {
  //   res.status(400).send({
  //     message: error.message,
  //   });
  // }
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    const tvshows = await getTvShows(genre, rating, premiere_year);
    res.status(200).send(tvshows);
  }catch (error) {
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

// *CRUD
// add
router.post("/", async (req,res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const season = req.body.season;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newTvShow = await addTvShow(
      title,
      creator,
      premiere_year,
      season,
      genre,
      rating,
    );
    //add movie func here
    res.status(200).send(newTvShow);
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
}); 

//update
router.put("/:id", async (req, res) => {
  try {
    const tvShow_id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const season = req.body.season;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedTvShow = await updateTvShow(
      tvShow_id,
      title,
      creator,
      premiere_year,
      season,
      genre,
      rating
    );
    res.status(200).send(updatedTvShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

//delete

router.delete("/:id", async (req,res) => {
  try {
    const tvShow_id = req.params.id;
    await Tvshow.findByIdAndDelete(tvShow_id);
    res.status(200).send("TvShow is deleted");
  } catch (errro) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
//export default router
