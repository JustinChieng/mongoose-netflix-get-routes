//load all the models
const Tvshow = require("../models/tvshow");

const getTvShows = async (genre, rating, premiere_year) => {
    try {
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
        return tvshows;
}   catch (error) {
    throw new Error(error);
}
};

const addTvShow = async (title, creator,premiere_year, season, genre, rating) => {
    //create new tvshow
    const newTvShow = new Tvshow({
        title,
        creator,
        premiere_year,
        season,
        genre,
        rating,
    });
    //save the tvshow with mongodb
    await newTvShow.save();
    return newTvShow
};

const updateTvShow = async (
    tvShow_id,
    title,
    creator,
    premiere_year,
    season,
    genre,
    rating
) =>{
    const updatedTvShow = await Tvshow.findByIdAndUpdate(
        tvShow_id,
        {
            title,
            creator,
            premiere_year,
            season,
            genre,
            rating
        },
        { new:true} //send in the updated data
    );
    return updatedTvShow;
};

const deleteTvShow = async () => {};

module.exports = {
    getTvShows,
    addTvShow,
    updateTvShow,
    deleteTvShow,
};