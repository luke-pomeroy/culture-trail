const request = require('supertest')
const app = require('../app')

describe('Post Signup Endpoint', () => {
  it('S', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })
})