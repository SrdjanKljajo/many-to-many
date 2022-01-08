import express from 'express'
const router = express.Router()

import {
  addMovieActors,
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  getMovieActors,
  updateMovie,
} from '../controllers/movie'

router.route('/').get(getAllMovies).post(createMovie)
router.route('/:slug').get(getMovie).put(updateMovie).delete(deleteMovie)
router.route('/:slug/actors').get(getMovieActors).patch(addMovieActors)

export default router
