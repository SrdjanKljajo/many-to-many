const request = require('supertest')
const app = require('../app')

describe('TEST MOVIE ROUTES', () => {
  const slug = 'test'
  const name = 'test'
  const title = 'test'
  const director = 'director'
  const release = '2001'
  const duration = 123

  describe('Get all movies', () => {
    test('GET, should respond with a 200 status code', async () => {
      await request(app)
        .get('/api/v1/movies')
        .expect(200)
        .expect('Content-Type', /json/)
    })
  })

  describe('Create movie, Get single movie, Update movie and Delete movie', () => {
    test('POST, should respond with a 201 status code and json content type', async () => {
      await request(app)
        .post('/api/v1/movies')
        .send({ title, director, release, duration })
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
        .send({ title, director, release, duration })
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test('GET, should respond with a 200 status code', async () => {
      await request(app).get(`/api/v1/movies/${slug}/actors`)
      expect(200)
    })

    test('PATCH, should respond with a 200 status code and json content type and success message', async () => {
      await request(app).post('/api/v1/actors').send({ name })
      await request(app)
        .patch(`/api/v1/movies/${slug}/actors`)
        .send({ name })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.msg).toEqual(
            `Actor ${slug} add succesfuly to movie ${title}`
          )
        })
      await request(app).delete(`/api/v1/actors/${slug}`)
    })

    test('PATCH, Actor dont exist - should respond with a 404 status code and error message', async () => {
      await request(app).post('/api/v1/actors').send({ name })
      await request(app)
        .patch(`/api/v1/movies/${slug}/actors`)
        .send({ name: 'noTest' })
        .expect(res => {
          expect(res.body.errMsg).toEqual(`Actor noTest not found`)
        })
        .expect(404)
      await request(app).delete(`/api/v1/actors/${slug}`)
    })

    test('DELETE, should respond with a 204 status code', async () => {
      await request(app).delete(`/api/v1/movies/${slug}`)
      expect(204)
    })
  })

  describe('Errors test', () => {
    test('GET, Movie not found - should respond with a 404 status code and error message', async () => {
      const slug = undefined
      await request(app)
        .get(`/api/v1/movies/${slug}`)
        .expect(404)
        .expect(res => {
          expect(res.body.errMsg).toEqual(`Movie ${slug} not found`)
        })
    })

    test('POST, Title are not provided - should respond with a 400 status code and error message', async () => {
      await request(app)
        .post(`/api/v1/movies`)
        .send({ title: null })
        .expect(res => {
          expect(res.body.errMsg.title).toEqual(`Movie must have a title`)
        })
        .expect(400)
    })

    test('POST, Title are empty - should respond with a 400 status code and error message', async () => {
      await request(app)
        .post(`/api/v1/movies`)
        .send({ title: '' })
        .expect(res => {
          expect(res.body.errMsg.title).toEqual(
            `Title must have 2 - 100 caracters!`
          )
        })
        .expect(400)
    })
  })
})
