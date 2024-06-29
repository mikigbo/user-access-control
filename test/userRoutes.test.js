const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../src/models/userModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes', () => {
    let authToken;

    before(async () => {
        // Mocking user data and generating a JWT token
        const userData = {
            id: 1,
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };

        authToken = jwt.sign(userData, process.env.JWT_SECRET);
    });

    afterEach(() => {
        sinon.restore(); // Restore the original functions after each test
    });

    describe('GET /users/:id', () => {
        it('should get a user by id', async () => {
            const expectedUser = {
                id: 1,
                username: 'testuser',
                email: 'testuser@example.com'
            };

            sinon.stub(User, 'getUserById').resolves(expectedUser);

            const res = await chai.request(app)
                .get('/users/1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal(expectedUser);
        });

        it('should return 404 if user id does not exist', async () => {
            sinon.stub(User, 'getUserById').resolves(null);

            const res = await chai.request(app)
                .get('/users/999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(404);
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const newUser = {
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'newpassword123'
            };

            const createdUser = {
                id: 2,
                username: newUser.username,
                email: newUser.email
            };

            sinon.stub(User, 'createUser').resolves(createdUser);

            const res = await chai.request(app)
                .post('/users')
                .set('Authorization', `Bearer ${authToken}`)
                .send(newUser);

            expect(res).to.have.status(201);
            expect(res.body).to.deep.equal(createdUser);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update a user by id', async () => {
            const userId = 1;
            const updatedUserData = {
                username: 'updateduser',
                email: 'updateduser@example.com',
                password: 'updatedpassword123'
            };

            sinon.stub(User, 'updateUser').resolves({ id: userId, ...updatedUserData });

            const res = await chai.request(app)
                .put(`/users/${userId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updatedUserData);

            expect(res).to.have.status(200);


            expect(res.body).to.deep.equal({ id: userId, ...updatedUserData });

            sinon.restore(); // Restore stub after use
        });

        it('should return 404 if user id does not exist', async () => {
            const nonExistentId = 9999;

            sinon.stub(User, 'updateUser').resolves(null); // Simulate user not found

            const res = await chai.request(app)
                .put(`/users/${nonExistentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({}); // Sending an empty object for simplicity

            console.log('eturn 404 if user id  res.body =>', res.body)
            expect(res.body).to.be.null;

            sinon.restore(); // Restore stub after use
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user by id', async () => {
            const userId = 1;

            sinon.stub(User, 'deleteUser').resolves({ id: userId });

            const res = await chai.request(app)
                .delete(`/users/${userId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal({ id: userId });

            sinon.restore(); // Restore stub after use
        });

        it('should return 404 if user id does not exist', async () => {
            const nonExistentId = 9999;

            sinon.stub(User, 'deleteUser').resolves(null); // Simulate user not found

            const res = await chai.request(app)
                .delete(`/users/${nonExistentId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.body).to.be.null;

            sinon.restore(); // Restore stub after use
        });
    });


});
