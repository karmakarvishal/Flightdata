/* eslint-disable linebreak-style */
const request = require('supertest');
const app = require('../index');
describe('Post Endpoints', () => {
  it('Tracks all Airlines Data', async () => {
    const res = await request(app)
        .post('/flights/track')
        .send({
          endpoint: 'airlines',
        });
    // console.log(res);
    expect(res).toEqual(expect.anything());
  });

  it('Gets all User Entries', async () => {
    const res = await request(app)
        .get('/users/');
    // console.log(res);
    expect(res).toEqual(expect.anything());
  });
});
