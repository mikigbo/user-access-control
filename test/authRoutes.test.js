// test/authRoutes.test.js
const sinon = require('sinon');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const User = require('../src/models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Auth Routes', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      sinon.stub(User, 'createUser').resolves({ id: 1 });

      const res = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('User registered successfully');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(() => {
      sinon.stub(User, 'findUserByEmail');
      sinon.stub(bcrypt, 'compare');
      sinon.stub(jwt, 'sign');
    });

    it('should log in a user and return a token', async () => {
      User.findUserByEmail.resolves({ id: 1, email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compare.resolves(true);
      jwt.sign.returns('fakeToken');

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.status).to.equal(200);
      expect(res.body.token).to.equal('fakeToken');
    });

    it('should return 404 if user is not found', async () => {
      User.findUserByEmail.resolves(null);

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'notfound@example.com', password: 'password123' });

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('User not found');
    });

    it('should return 401 for invalid credentials', async () => {
      User.findUserByEmail.resolves({ id: 1, email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compare.resolves(false);

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'wrongPassword' });

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Invalid credentials');
    });
  });
});
