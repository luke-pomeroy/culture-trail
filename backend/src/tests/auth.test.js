const request = require('supertest');
const app = require('../app');
const { User, Role } = require('../db/models');
const authService = require('../services/auth.service');

const testUser = {
  email: "authtest@culturetrail.test",
  password: "dj59696rjv"
};

afterAll(async() => {
  await User.destroy({where: { email: testUser.email }});
});

describe('POST: /api/auth/register (register)', () => {

  it('Should return a success message when credentials supplied', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toBe("OK");
    expect(res.body.message).toBe("User was successfully registered!");
  });

  it('Should return an error when no credentials are supplied', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("Data Validation Error");
  });

  it('Should return an error when a duplicate email is used', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(testUser);
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');  
    expect(res.body.errors.email).toBe("Email has already been registered!")  
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("Data Validation Error");
  });
});

describe('POST: /api/auth/login (login)', () => {

  it('Should return successfully when credentials supplied', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(testUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('id');
    expect(res.body.data.user).toHaveProperty('roles');
    expect(Array.isArray(res.body.data.user.roles)).toBe(true);
    expect(res.body.data.user.roles.length).toBe(1);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.status).toBe("OK");
    expect(res.body.message).toBe("New access and refresh token succesfully issued.");
  });

  it('Should return an error when no credentials are supplied', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ email: 'doesnotexist@culture-trail.com', password: 'usernotexists'});
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('user');
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("User not found.");
  });

  it('Should return an error when the user supplied does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("Data Validation Error");
  });

});

describe('POST: /api/auth/refresh-token (refreshToken)', () => {

  let user, validRefreshToken, validAccessToken, invalidRefreshToken;

  beforeAll(async () => {
    let role = await Role.findAll({where: {name: 'user'}});
    user = await User.create({
      email: "refreshauthtest@culturetrail.test",
      password: "dj59696rjv",
    });
    await user.setRoles(role);
    await user.reload({
      include: {
          model: Role, 
          attributes: ['id', 'name'],
          through: {
              attributes: []
          }
      }
  });

    validAccessToken = await authService.generateAccessToken(user, '1m');
    validRefreshToken = await authService.generateRefreshToken(user, '5m');
    invalidRefreshToken = await authService.generateRefreshToken(user, '1s');   
  });

  afterAll(async() => {
    await User.destroy({where: { id: user.id }});
  });

  it('Should return successfully when refreshToken supplied', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + validRefreshToken)
      .expect('Content-Type', /json/)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('id');
    expect(res.body.data.user).toHaveProperty('roles');
    expect(Array.isArray(res.body.data.user.roles)).toBe(true);
    expect(res.body.data.user.roles.length).toBe(1);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.data.accessToken).not.toBe(validAccessToken);
    expect(res.body.data.refreshToken).not.toBe(validRefreshToken);
    expect(res.body.status).toBe("OK");
    expect(res.body.message).toBe("New access and refresh token succesfully issued.");
  });

  it('Should return an error if accessToken is supplied instead of refreshToken', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + validAccessToken)
      .expect('Content-Type', /json/)
      .send();
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('refreshToken');
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("Authentication Error");
  });

  it('Should return an error if token is not in whitelist', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + invalidRefreshToken)
      .expect('Content-Type', /json/)
      .send();
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('refreshToken');
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("Authentication Error");
  });

  it('Should return an error when no refreshToken is supplied', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send();
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('refreshToken');
    expect(res.body.status).toBe("ERROR");
    expect(res.body.message).toBe("Authentication Error");
  });
});
