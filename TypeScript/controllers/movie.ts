import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomApiError from '../errors'
import db from '../models'

// @desc      Get movies
// @route     GET /api/v1/movies
const getAllMovies = async (req: Request, res: Response): Promise<any> => {
  const movies = await db.Movie.findAll({
    include: db.Actor,
    order: [
      ['title', 'ASC'],
      [{ model: db.Actor }, 'name', 'ASC'],
    ],
  })
  res.status(StatusCodes.OK).json({
    status: 'success',
    movies,
    count: movies.length,
  })
}

// @desc      Get single movie
// @route     GET /api/v1/movies/:slug
const getMovie = async (req: Request, res: Response): Promise<any> => {
  const slug = req.params.slug
  const movie = await db.Movie.findOne({ where: { slug }, include: db.Actor })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  res.status(StatusCodes.OK).json({
    status: 'success',
    movie,
  })
}

// @desc      Create movie
// @route     movie /api/v1/movies
const createMovie = async (req: Request, res: Response): Promise<any> => {
  const { title, director, release, duration } = req.body
  const movie = await db.Movie.create({
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
const updateMovie = async (req: Request, res: Response): Promise<any> => {
  const slug = req.params.slug
  const { title, director, release, duration } = req.body
  const movie = await db.Movie.findOne({ where: { slug } })

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
const addMovieActors = async (req: Request, res: Response): Promise<any> => {
  const slug = req.params.slug
  const { name } = req.body
  const movie = await db.Movie.findOne({ where: { slug } })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  const actor = await db.Actor.findOne({ where: { name } })

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
const deleteMovie = async (req: Request, res: Response): Promise<any> => {
  const slug = req.params.slug
  const movie = await db.Movie.findOne({ where: { slug } })

  if (!movie) throw new CustomApiError.NotFoundError(`Movie ${slug} not found`)

  await movie.destroy()
  res.status(StatusCodes.NO_CONTENT).send()
}

// @desc      Get posts by movie
// @route     GET /api/v1/movies/:slug/actors
const getMovieActors = async (req: Request, res: Response): Promise<any> => {
  const slug = req.params.slug
  const movie = await db.Movie.findOne({
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

export {
  createMovie,
  addMovieActors,
  deleteMovie,
  getAllMovies,
  updateMovie,
  getMovie,
  getMovieActors,
}
