import request from 'supertest';
import sinon from 'sinon';
import app from '../../../app';
import userServices from '../../../services/users/users.service';
import authServices from '../../../services/auth/auth.service';
import { IUser } from '../../../types/userTypes';
import { Types } from 'mongoose';

describe('Users controller', () => {
  const users: IUser[] = [
    {
      _id: '66508d4d24980c2347c99e4b' as unknown as Types.ObjectId,
      email: 'user1@example.com',
      name: 'user1',
      password: '123',
    },
  ];
  let getUsersStub: sinon.SinonStub;
  let countUsersStub: sinon.SinonStub;
  let getUserByIdStub: sinon.SinonStub;
  let getUserByEmailStub: sinon.SinonStub;
  let createUserStub: sinon.SinonStub;
  let createTokenStub: sinon.SinonStub;


  beforeEach(() => {
    getUsersStub = sinon.stub(userServices, 'getUsers').resolves(users);
    getUserByIdStub = sinon.stub(userServices, 'getUserById').resolves(users[0]);
    getUserByEmailStub = sinon.stub(userServices, 'getUserByEmail').resolves(null);
    createUserStub = sinon.stub(userServices, 'createUser').resolves(users[0]);
    createTokenStub = sinon.stub(authServices, 'createToken').returns('token');
    countUsersStub = sinon
      .stub(userServices, 'countUsers')
      .resolves(users.length);
  });

  afterEach(() => {
    getUsersStub.restore();
    countUsersStub.restore();
    getUserByIdStub.restore();
    getUserByEmailStub.restore();
    createUserStub.restore();
    createTokenStub.restore();
  });

  describe('GET /users', () => {
    const limit = 10;
    const page = 1;
    it('should return 200', async () => {
      const res = await request(app).get('/users').query({ page, limit });
      sinon.assert.calledOnce(countUsersStub);
      sinon.assert.calledOnce(getUsersStub);
      expect(res.body).toEqual({
        data: users,
        limit: limit,
        page: page,
        totalItems: users.length,
        totalPages: 1,
      });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200', async () => {
      const userId = users[0]._id;
      const res = await request(app).get(`/users/${userId}`);
      sinon.assert.calledOnce(getUserByIdStub);
      expect(res.body).toEqual(users[0]);
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if user not found', async () => {
      const userId = '66508d4d24980c2347c99111';
      getUserByIdStub.resolves(null);
      const res = await request(app).get(`/users/${userId}`);
      sinon.assert.calledOnce(getUserByIdStub);
      expect(res.body).toEqual({ message: 'User not found' });
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /users/register', () => {
    const user = users[0];
        const newUser = {
            email: user.email,
            name: user.name,
            password: user.password,
        };
    it('should return 201', async () => {
        const res = await request(app).post('/users/register').send(newUser);
        sinon.assert.calledOnce(getUserByEmailStub);
        sinon.assert.calledOnce(createUserStub);
        sinon.assert.calledOnce(createTokenStub);
        expect(res.body).toEqual(user);
    });

    it('should return 409 if user already exists', async () => {
        getUserByEmailStub.resolves(user);
        const res = await request(app).post('/users/register').send(newUser);
        sinon.assert.calledOnce(getUserByEmailStub);
        expect(res.body).toEqual({
            email: user.email,
            message: 'User already exists',
            name: user.name,
        });
        expect(res.statusCode).toEqual(409);
    });
  });
});

