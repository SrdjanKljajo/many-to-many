const { StatusCodes } = require('http-status-codes')
const { Actor, Movie } = require('../models')
const CustomApiError = require('../errors')

// @desc      Get movies
// @route     GET /api/v1/movies
const getAllMovies = async (req, res) => {
  const movies = await Movie.findAll({ include: 'actors' })
  res.status(StatusCodes.OK).json({
    status: 'success',
    movies,
    count: movies.length,
  })
}

// @desc      Get single movie
// @route     GET /api/v1/movies/:slug
const getMovie = async (req, res) => {
  const slug = req.params.slug
  const movie = await Movie.findOne({ where: { slug }, include: 'actors' })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  res.status(StatusCodes.OK).json({
    status: 'success',
    movie,
  })
}

// @desc      Create movie
// @route     movie /api/v1/movies
const createMovie = async (req, res) => {
  const { title, director, release, duration } = req.body
  const movie = await Movie.create({
    title,
    director,
    release,
    duration,
  })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    movie,
  })
}

// @desc      Update all movie atrributes at once
// @route     PUT /api/v1/movies/:slug
const updateMovie = async (req, res) => {
  const slug = req.params.slug
  const { title, director, release, duration } = req.body
  const movie = await Movie.findOne({ where: { slug } })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  movie.title = title
  movie.director = director
  movie.release = release
  movie.duration = duration
  await movie.save()

  res.status(StatusCodes.OK).json({ movie })
}

// @desc      Update all movie atrributes at once
// @route     PATCH /api/v1/movies/:slug/actors
const addMovieActors = async (req, res) => {
  const slug = req.params.slug
  const { name } = req.body
  const movie = await Movie.findOne({ where: { slug } })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  const actor = await Actor.findOne({ where: { name } })

  if (!actor) throw new CustomApiError.NotFoundError(`Actor ${name} not found`)

  await movie.addActor(actor)
  await movie.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    msg: `Actor ${name} add succesfuly to movie ${movie.title}`,
    newAddedActor: actor,
  })
}

// @desc      Delete movie
// @route     DELETE /api/v1/movie/:slug
const deleteMovie = async (req, res) => {
  const slug = req.params.slug
  const movie = await Movie.findOne({ where: { slug } })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  await movie.destroy()
  res.status(StatusCodes.NO_CONTENT).send()
}

// @desc      Get posts by movie
// @route     GET /api/v1/movies/:slug/actors
const getMovieActors = async (req, res) => {
  const slug = req.params.slug
  const movie = await Movie.findOne({
    where: { slug },
    include: 'actors',
  })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  const movieActors = movie.actors

  if (movieActors.length < 1) {
    return res.status(StatusCodes.OK).json({
      ststus: 'success',
      msg: `Movie ${slug} not have a actors`,
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    movie: movie.title,
    movieActors,
    count: movieActors.length,
  })
}

module.exports = {
  createMovie,
  addMovieActors,
  deleteMovie,
  getAllMovies,
  updateMovie,
  getMovie,
  getMovieActors,
}
