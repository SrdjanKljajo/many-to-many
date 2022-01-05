const { StatusCodes } = require('http-status-codes')
const { Actor, Movie } = require('../models')
const CustomApiError = require('../errors')

// @desc      Get actors
// @route     GET /api/v1/actors
const getAllActors = async (req, res) => {
  const actors = await Actor.findAll({
    include: 'movies',
  })
  res.status(StatusCodes.OK).json({
    status: 'success',
    actors,
    count: actors.length,
  })
}

// @desc      Get single actor
// @route     GET /api/v1/actors/:slug
const getActor = async (req, res) => {
  const slug = req.params.slug
  const actor = await Actor.findOne({ where: { slug }, include: 'movies' })

  if (!actor) {
    throw new CustomApiError.NotFoundError(`Actor ${slug} not found`)
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    actor,
  })
}

// @desc      Create actor
// @route     actor /api/v1/actors
const createActor = async (req, res) => {
  const { name } = req.body
  const actor = await Actor.create({ name })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    actor,
  })
}

// @desc      Update all movie atrributes at once
// @route     PUT /api/v1/actors/:slug
const updateActor = async (req, res) => {
  const slug = req.params.slug
  const { name } = req.body
  const actor = await Actor.findOne({ where: { slug } })

  if (!actor) {
    throw new CustomApiError.NotFoundError(`Actor ${slug} not found`)
  }

  actor.name = name
  await actor.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    actor,
  })
}

// @desc      Update all actor atrributes at once
// @route     PATCH /api/v1/actors/:slug/movies
const addActorMovies = async (req, res) => {
  const slug = req.params.slug
  const { title } = req.body
  const actor = await Actor.findOne({ where: { slug } })

  if (!actor) {
    throw new CustomApiError.NotFoundError(`Actor ${slug} not found`)
  }

  const movie = await Movie.findOne({ where: { title } })

  if (!movie) {
    throw new CustomApiError.NotFoundError(`Movie ${title} not found`)
  }

  await actor.addMovie(movie)
  await actor.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    msg: `Movie ${title} add succesfuly to actor ${actor.name}`,
    newAddedMovie: movie,
  })
}

// @desc      Delete actor
// @route     DELETE /api/v1/actors/:slug
const deleteActor = async (req, res) => {
  const slug = req.params.slug
  const actor = await Actor.findOne({ where: { slug } })

  if (!actor) {
    throw new CustomApiError.NotFoundError(`Actor ${slug} not found`)
  }

  await actor.destroy()
  res.status(StatusCodes.NO_CONTENT).send()
}

// @desc      Get posts by actor
// @route     GET /api/v1/actors/:slug/movies
const getActorMovies = async (req, res) => {
  const slug = req.params.slug
  const actor = await Actor.findOne({ where: { slug }, include: 'movies' })

  if (!actor) {
    throw new CustomApiError.NotFoundError(`Actor ${slug} not found`)
  }

  const actorMovies = actor.movies

  if (actorMovies.length < 1) {
    return res.status(StatusCodes.OK).json({
      status: 'success',
      msg: `Actor ${slug} not have a movies`,
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    actor: actor.name,
    actorMovies,
    count: actorMovies.length,
  })
}

module.exports = {
  createActor,
  addActorMovies,
  deleteActor,
  getAllActors,
  updateActor,
  getActor,
  getActorMovies,
}
