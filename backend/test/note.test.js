const chai = require('chai');
const supertest = require('supertest');
const app = require('../index');

const { expect } = chai;
const request = supertest(app);

describe('Note Routes', () => {
  let token;
  let noteId;

  before(async () => {
    try {
      const res = await request.post('/api/auth/signup').send({
        name: 'Note Test User',
        email: 'notetest@example.com',
        password: 'password123',
      });
      token = res.body.token;

      const noteRes = await request
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Seeded Note',
          content: 'Seeded content',
        });
      noteId = noteRes.body._id;
    } catch (error) {
      throw new Error(`Note test setup failed: ${error.message}`);
    }
  });

  describe('POST /api/notes', () => {
    it('should create a note successfully', async () => {
      try {
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
      } catch (error) {
        throw new Error(`Create note test failed: ${error.message}`);
      }
    });

    it('should fail if fields are missing', async () => {
      try {
        const res = await request
          .post('/api/notes')
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'No Content' });
        expect(res.status).to.equal(400);
      } catch (error) {
        throw new Error(`Missing fields test failed: ${error.message}`);
      }
    });

    it('should fail without token', async () => {
      try {
        const res = await request.post('/api/notes').send({
          title: 'Test Note',
          content: 'Test content',
        });
        expect(res.status).to.equal(401);
      } catch (error) {
        throw new Error(`No token test failed: ${error.message}`);
      }
    });
  });

  describe('GET /api/notes', () => {
    it('should get all notes for logged in user', async () => {
      try {
        const res = await request
          .get('/api/notes')
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
      } catch (error) {
        throw new Error(`Get notes test failed: ${error.message}`);
      }
    });

    it('should fail without token', async () => {
      try {
        const res = await request.get('/api/notes');
        expect(res.status).to.equal(401);
      } catch (error) {
        throw new Error(`No token test failed: ${error.message}`);
      }
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should get a single note by id', async () => {
      try {
        const res = await request
          .get(`/api/notes/${noteId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal(noteId);
      } catch (error) {
        throw new Error(`Get note by id test failed: ${error.message}`);
      }
    });

    it('should fail with invalid note id', async () => {
      try {
        const res = await request
          .get('/api/notes/invalidid')
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(400);
      } catch (error) {
        throw new Error(`Invalid id test failed: ${error.message}`);
      }
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update a note successfully', async () => {
      try {
        const res = await request
          .put(`/api/notes/${noteId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'Updated Title',
            content: 'Updated content',
          });
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Updated Title');
      } catch (error) {
        throw new Error(`Update note test failed: ${error.message}`);
      }
    });

    it('should fail without token', async () => {
      try {
        const res = await request
          .put(`/api/notes/${noteId}`)
          .send({ title: 'Updated' });
        expect(res.status).to.equal(401);
      } catch (error) {
        throw new Error(`No token test failed: ${error.message}`);
      }
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete a note successfully', async () => {
      try {
        const res = await request
          .delete(`/api/notes/${noteId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Note deleted successfully');
      } catch (error) {
        throw new Error(`Delete note test failed: ${error.message}`);
      }
    });

    it('should fail without token', async () => {
      try {
        const res = await request.delete(`/api/notes/${noteId}`);
        expect(res.status).to.equal(401);
      } catch (error) {
        throw new Error(`No token test failed: ${error.message}`);
      }
    });
  });
});