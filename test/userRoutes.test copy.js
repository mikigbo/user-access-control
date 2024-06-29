
// test/userRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Use require() for CommonJS modules

chai.use(chaiHttp);
const expect = chai.expect;



describe('User Routes', () => {
    // Test for GET /users endpoint q
    describe('GET /users', () => {
        it('should get all users', async () => {
            const res = await chai.request(app).get('/users');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
        });
    });

    // Test for POST /users endpoint
    describe('POST /users', () => {
        it('should create a new user', async () => {
            const newUser = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const res = await chai.request(app).post('/users').send(newUser);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('id');
            expect(res.body.username).to.equal(newUser.username);
            // Add more assertions as needed
        });
    });

    // Test for GET /users/:id endpoint
    describe('GET /users/:id', () => {
        it('should get a user by id', async () => {
            // Assuming there is a user with ID 1 in the database
            const userId = 1;
            const res = await chai.request(app).get(`/users/${userId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('id', userId);
        });

        it('should return 404 if user id does not exist', async () => {
            const nonExistentId = 9999;
            const res = await chai.request(app).get(`/users/${nonExistentId}`);
            expect(res).to.have.status(404);
        });
    });

    // Test for PUT /users/:id endpoint
    describe('PUT /users/:id', () => {
        it('should update a user by id', async () => {
            // Assuming there is a user with ID 1 in the database
            const userId = 1;
            const updatedUserData = {
                username: 'updateduser',
                email: 'updateduser@example.com',
                password: 'updatedpassword123',
            };

            const res = await chai.request(app).put(`/users/${userId}`).send(updatedUserData);
            expect(res).to.have.status(200);
            // Verify the user has been updated correctly
            const updatedUser = await chai.request(app).get(`/users/${userId}`);
            expect(updatedUser.body.username).to.equal(updatedUserData.username);
            // Add more assertions as needed
        });

        it('should return 404 if user id does not exist', async () => {
            const nonExistentId = 9999;
            const res = await chai.request(app).put(`/users/${nonExistentId}`).send({}); // Sending an empty object
            expect(res).to.have.status(404);
        });
    });

    // Test for DELETE /users/:id endpoint
    describe('DELETE /users/:id', () => {
        it('should delete a user by id', async () => {
            // Assuming there is a user with ID 1 in the database
            const userId = 1;
            const res = await chai.request(app).delete(`/users/${userId}`);
            expect(res).to.have.status(200);
            // Verify the user has been deleted (check GET endpoint)
            const deletedUser = await chai.request(app).get(`/users/${userId}`);
            expect(deletedUser).to.have.status(404); // Assuming 404 is returned for non-existent user
        });

        it('should return 404 if user id does not exist', async () => {
            const nonExistentId = 9999;
            const res = await chai.request(app).delete(`/users/${nonExistentId}`);
            expect(res).to.have.status(404);
        });
    });
});
