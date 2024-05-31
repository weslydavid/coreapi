import request from 'supertest';
import app from '../app';

describe('Health check', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
  });
});
