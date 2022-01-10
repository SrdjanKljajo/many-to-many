const request = require('supertest')
const app = require('../app')

describe('TEST MOVIE ROUTES', () => {
  describe('Get all movies', () => {
    test('GET, should respond with a 200 status code', async () => {
      await request(app)
        .get('/api/v1/movies')
        .expect(200)
        .expect('Content-Type', /json/)
    })
  })

  describe('Create movie, Get single movie, Update movie and Delete movie', () => {
    const slug = 'test'

    test('POST, should respond with a 201 status code and json content type', async () => {
      await request(app)
        .post('/api/v1/movies')
        .send({
          title: 'test',
          director: 'director',
          release: '2001',
          duration: 123,
        })
        .expect(201)
        .expect('Content-Type', /json/)
    })

    test('GET, should respond with a 200 status code and json content type', async () => {
      await request(app)
        .get(`/api/v1/movies/${slug}`)
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test('PUT, should respond with a 200 status code and json content type', async () => {
      await request(app)
        .put(`/api/v1/movies/${slug}`)
        .send({
          title: 'retest',
          director: 'redirector',
          release: '2003',
          duration: '123',
        })
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test('GET, should respond with a 200 status code', async () => {
      await request(app).get(`/api/v1/movies/${slug}/actors`)
      expect(200)
    })

    test('PATCH, should respond with a 200 status code and json content type', async () => {
      await request(app).post('/api/v1/actors').send({ name: 'patchtest' })
      await request(app)
        .patch(`/api/v1/movies/${slug}/actors`)
        .send({ name: 'patchtest' })
        .expect(200)
        .expect('Content-Type', /json/)
      await request(app).delete(`/api/v1/actors/patchtest`)
    })

    test('PATCH, Actor dont exist - should respond with a 404 status code', async () => {
      await request(app).post('/api/v1/actors').send({ name: 'patchtest' })
      await request(app)
        .patch(`/api/v1/actors/${slug}/movies`)
        .send({ name: '' }, { name: null }, { name: 'noPatchtest' })
        .expect(404)
      await request(app).delete(`/api/v1/actors/patchtest`)
    })

    test('DELETE, should respond with a 204 status code', async () => {
      await request(app).delete(`/api/v1/movies/${slug}`)
      expect(204)
    })
  })

  describe('Errors test', () => {
    test('GET, Movie not found - should respond with a 404 status code', async () => {
      const slug = undefined
      await request(app).get(`/api/v1/movies/${slug}`).expect(404)
    })

    test('POST, Title and director are not provided - should respond with a 400 status code', async () => {
      await request(app)
        .post(`/api/v1/movies`)
        .send({ title: '', director: '' }, { title: null, director: null })
        .expect(400)
    })
  })
})
