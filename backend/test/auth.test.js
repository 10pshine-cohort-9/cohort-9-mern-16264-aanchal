const chai = require('chai');
const supertest = require('supertest');
const app = require('../index');

const { expect } = chai;
const request = supertest(app);

describe('Auth Routes', () => {
  let token;

  before(async () => {
    try {
      await request.post('/api/auth/signup').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    } catch (error) {
      throw new Error(`Auth test setup failed: ${error.message}`);
    }
  });

  describe('POST /api/auth/signup', () => {
    it('should register a new user successfully', async () => {
      try {
        const res = await request.post('/api/auth/signup').send({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
        });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
        expect(res.body.email).to.equal('newuser@example.com');
      } catch (error) {
        throw new Error(`Signup test failed: ${error.message}`);
      }
    });

    it('should fail if required fields are missing', async () => {
      try {
        const res = await request.post('/api/auth/signup').send({
          email: 'test@example.com',
        });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
      } catch (error) {
        throw new Error(`Missing fields test failed: ${error.message}`);
      }
    });

    it('should fail if user already exists', async () => {
      try {
        const res = await request.post('/api/auth/signup').send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User already exists');
      } catch (error) {
        throw new Error(`Duplicate user test failed: ${error.message}`);
      }
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      try {
        const res = await request.post('/api/auth/login').send({
          email: 'test@example.com',
          password: 'password123',
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
      } catch (error) {
        throw new Error(`Login test failed: ${error.message}`);
      }
    });

    it('should fail with wrong password', async () => {
      try {
        const res = await request.post('/api/auth/login').send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Invalid email or password');
      } catch (error) {
        throw new Error(`Wrong password test failed: ${error.message}`);
      }
    });

    it('should fail if user does not exist', async () => {
      try {
        const res = await request.post('/api/auth/login').send({
          email: 'notfound@example.com',
          password: 'password123',
        });
        expect(res.status).to.equal(401);
      } catch (error) {
        throw new Error(`User not found test failed: ${error.message}`);
      }
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully with valid token', async () => {
      try {
        const loginRes = await request.post('/api/auth/login').send({
          email: 'test@example.com',
          password: 'password123',
        });
        token = loginRes.body.token;
        const res = await request
          .post('/api/auth/logout')
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Logged out successfully');
      } catch (error) {
        throw new Error(`Logout test failed: ${error.message}`);
      }
    });

    it('should fail logout without token', async () => {
      try {
        const res = await request.post('/api/auth/logout');
        expect(res.status).to.equal(401);
      } catch (error) {
        throw new Error(`No token logout test failed: ${error.message}`);
      }
    });
  });
});