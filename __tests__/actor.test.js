const request = require('supertest')
const app = require('../app')

const data = {
  name: 'testName',
  slug: 'testname',
  title: 'testTitle',
  titleSlug: 'testtitle',
}

describe('TEST ACTOR ROUTES', () => {
  const { slug, title, titleSlug, name } = data

  describe('Get all actors', () => {
    test('GET, should respond with a 200 status code and json content type', async () => {
      await request(app)
        .get('/api/v1/actors')
        .expect(200)
        .expect('Content-Type', /json/)
    })
  })

  describe('Add actor, Get single actor, Update actor and Delete actor', () => {
    test('POST, should respond with a 201 status code and json content type when create actor', async () => {
      await request(app)
        .post('/api/v1/actors')
        .send({ name })
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
        .send({ name })
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test('GET, should respond with a 200 status code', async () => {
      await request(app).get(`/api/v1/actors/${slug}/movies`)
      expect(200)
    })

    test('PATCH, should respond with a 200 status code, json content type and success message', async () => {
      await request(app).post('/api/v1/movies').send({ title })
      await request(app)
        .patch(`/api/v1/actors/${slug}/movies`)
        .send({ title })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.msg).toEqual(
            `Movie ${title} add succesfuly to actor ${name}`
          )
        })
      await request(app).delete(`/api/v1/movies/${titleSlug}`)
    })

    test('PATCH, Movie dont exist - should respond with a 404 status code and error message', async () => {
      await request(app).post('/api/v1/movies').send({ title })
      await request(app)
        .patch(`/api/v1/actors/${slug}/movies`)
        .send({ title: 'noTestTitle' })
        .expect(res => {
          expect(res.body.errMsg).toEqual(`Movie noTestTitle not found`)
        })
        .expect(404)
      await request(app).delete(`/api/v1/movies/${titleSlug}`)
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
