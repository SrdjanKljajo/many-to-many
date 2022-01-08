import express from 'express'
const router = express.Router()

import {
  addActorMovies,
  createActor,
  deleteActor,
  getActor,
  getActorMovies,
  getAllActors,
  updateActor,
} from '../controllers/actor'

router.route('/').get(getAllActors).post(createActor)
router.route('/:slug').get(getActor).put(updateActor).delete(deleteActor)
router.route('/:slug/movies').get(getActorMovies).patch(addActorMovies)

export default router
