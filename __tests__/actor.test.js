const request = require('supertest')
const app = require('../app')

describe('TEST ACTOR ROUTES', () => {
  describe('Get all actors', () => {
    test('GET, should respond with a 200 status code and json content type', async () => {
      await request(app)
        .get('/api/v1/actors')
        .expect(200)
        .expect('Content-Type', /json/)
    })
  })

  describe('Add actor, Get single actor, Update actor and Delete actor', () => {
    const slug = 'test'

    test('POST, should respond with a 201 status code and json content type when create actor', async () => {
      await request(app)
        .post('/api/v1/actors')
        .send({ name: 'test' })
        .expect(201)
        .expect('Content-Type', /json/)
    })

    test('GET, should respond with a 200 status code and json content type', async () => {
      await request(app)
        .get(`/api/v1/actors/${slug}`)
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test('PUT, should respond with a 200 status code', async () => {
      await request(app)
        .put(`/api/v1/actors/${slug}`)
        .send({ name: 'retest' })
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test('GET, should respond with a 200 status code', async () => {
      await request(app).get(`/api/v1/actors/${slug}/movies`)
      expect(200)
    })

    test('PATCH, should respond with a 200 status code, json content type and success message', async () => {
      await request(app).post('/api/v1/movies').send({ title: 'patchtest' })
      await request(app)
        .patch(`/api/v1/actors/${slug}/movies`)
        .send({ title: 'patchtest' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.msg).toEqual(
            `Movie patchtest add succesfuly to actor retest`
          )
        })
      await request(app).delete(`/api/v1/movies/patchtest`)
    })

    test('PATCH, Movie dont exist - should respond with a 404 status code and error message', async () => {
      await request(app).post('/api/v1/movies').send({ title: 'patchtest' })
      await request(app)
        .patch(`/api/v1/actors/${slug}/movies`)
        .send({ title: '' }, { title: null }, { title: 'noPatchtest' })
        .expect(res => {
          expect(res.body.errMsg).toEqual(`Movie  not found`)
        })
        .expect(404)
      await request(app).delete(`/api/v1/movies/patchtest`)
    })

    test('DELETE, should respond with a 204 status code', async () => {
      await request(app).delete(`/api/v1/actors/${slug}`)
      expect(204)
    })
  })

  describe('Errors test', () => {
    test('GET, Actor not found - should respond with a 404 status code and error message', async () => {
      const slug = undefined
      await request(app)
        .get(`/api/v1/actors/${slug}`)
        .expect(res => {
          expect(res.body.errMsg).toEqual(`Actor ${slug} not found`)
        })
        .expect(404)
    })

    test('POST, Name are not provided - should respond with a 400 status code and error message', async () => {
      await request(app)
        .post(`/api/v1/actors`)
        .send({ name: null })
        .expect(res => {
          expect(res.body.errMsg.name).toEqual(`Actor must have a name`)
        })
        .expect(400)
    })

    test('POST, Name is empty - should respond with a 400 status code and error  message', async () => {
      await request(app)
        .post(`/api/v1/actors`)
        .send({ name: '' })
        .expect(res => {
          expect(res.body.errMsg.name).toEqual(
            'Name must have 2 - 50 caracters.'
          )
        })
        .expect(400)
    })
  })
})
