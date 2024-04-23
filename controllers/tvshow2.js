// load all the models
const Show = require("../models/show");

const getShows = async (genre, rating, premiere_year) => {
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
  return shows;
};

const getShow = async (id) => {
  const show = await Show.findById(id);
  return show;
};

const addShow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const newShow = new Show({
    title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  await newShow.save();
  return newShow;
};

const updateShow = async (
  show_id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const updatedShow = Show.findByIdAndUpdate(
    show_id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    },
    {
      new: true,
    }
  );
  return updatedShow;
};

const deleteShow = async (id) => {
  return await Show.findByIdAndDelete(id);
};

module.exports = {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
};
