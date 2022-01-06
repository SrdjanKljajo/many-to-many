const express = require('express')
const router = express.Router()

const {
  createActor,
  getAllActors,
  getActor,
  deleteActor,
  updateActor,
  getActorMovies,
  addActorMovies,
} = require('../controllers/actor')

router.route('/').get(getAllActors).post(createActor)
router.route('/:slug').get(getActor).put(updateActor).delete(deleteActor)
router.route('/:slug/movies').get(getActorMovies).patch(addActorMovies)

module.exports = router
