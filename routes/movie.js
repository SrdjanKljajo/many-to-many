const express = require('express')
const router = express.Router()

const {
  createMovie,
  getAllMovies,
  getMovie,
  deleteMovie,
  updateMovie,
  getMovieActors,
  addMovieActors,
} = require('../controllers/movie')

router.route('/').get(getAllMovies).post(createMovie)
router.route('/:slug').get(getMovie).put(updateMovie).delete(deleteMovie)
router.route('/:slug/actors').get(getMovieActors).patch(addMovieActors)

module.exports = router
