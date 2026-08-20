const chai = require('chai');
const supertest = require('supertest');
const app = require('../index');

const { expect } = chai;
const request = supertest(app);

describe('Auth Routes', () => {
  let token;

  describe('POST /api/auth/signup', () => {
    it('should register a new user successfully', async () => {
      const res = await request.post('/api/auth/signup').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
      expect(res.body.email).to.equal('test@example.com');
    });

    it('should fail if required fields are missing', async () => {
      const res = await request.post('/api/auth/signup').send({
        email: 'test@example.com',
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
    });

    it('should fail if user already exists', async () => {
      const res = await request.post('/api/auth/signup').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const res = await request.post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      token = res.body.token;
    });

    it('should fail with wrong password', async () => {
      const res = await request.post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Invalid email or password');
    });

    it('should fail if user does not exist', async () => {
      const res = await request.post('/api/auth/login').send({
        email: 'notfound@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(401);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully with valid token', async () => {
      const res = await request
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Logged out successfully');
    });

    it('should fail logout without token', async () => {
      const res = await request.post('/api/auth/logout');
      expect(res.status).to.equal(401);
    });
  });
});