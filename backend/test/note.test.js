const chai = require('chai');
const supertest = require('supertest');
const app = require('../index');

const { expect } = chai;
const request = supertest(app);

describe('Note Routes', () => {
  let token;
  let noteId;

  before(async () => {
    const res = await request.post('/api/auth/signup').send({
      name: 'Note Test User',
      email: 'notetest@example.com',
      password: 'password123',
    });
    token = res.body.token;
  });

  describe('POST /api/notes', () => {
    it('should create a note successfully', async () => {
      const res = await request
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Note',
          content: 'Test content',
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('_id');
      expect(res.body.title).to.equal('Test Note');
      noteId = res.body._id;
    });

    it('should fail if fields are missing', async () => {
      const res = await request
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'No Content' });
      expect(res.status).to.equal(400);
    });

    it('should fail without token', async () => {
      const res = await request.post('/api/notes').send({
        title: 'Test Note',
        content: 'Test content',
      });
      expect(res.status).to.equal(401);
    });
  });

  describe('GET /api/notes', () => {
    it('should get all notes for logged in user', async () => {
      const res = await request
        .get('/api/notes')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });

    it('should fail without token', async () => {
      const res = await request.get('/api/notes');
      expect(res.status).to.equal(401);
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should get a single note by id', async () => {
      const res = await request
        .get(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body._id).to.equal(noteId);
    });

    it('should fail with invalid note id', async () => {
      const res = await request
        .get('/api/notes/invalidid')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(400);
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update a note successfully', async () => {
      const res = await request
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Updated Title',
          content: 'Updated content',
        });
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Updated Title');
    });

    it('should fail without token', async () => {
      const res = await request
        .put(`/api/notes/${noteId}`)
        .send({ title: 'Updated' });
      expect(res.status).to.equal(401);
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete a note successfully', async () => {
      const res = await request
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Note deleted successfully');
    });

    it('should fail without token', async () => {
      const res = await request.delete(`/api/notes/${noteId}`);
      expect(res.status).to.equal(401);
    });
  });
});