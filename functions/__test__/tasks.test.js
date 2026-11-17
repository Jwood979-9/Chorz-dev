const request = require('supertest');
const { app } = require('../index'); 

describe('POST /tasks - Endpoint Integration', () => {

  it('should return 400 Bad Request if required fields are missing', async () => {
    const incompletePayload = {};

    const response = await request(app)
      .post('/tasks')
      .send(incompletePayload);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid task data");
    expect(response.body).toHaveProperty('errors');
  });

  it('should return 400 Bad Request if data types or rules are invalid', async () => {
    const invalidTypePayload = {
      title: "Hi",
      clinicId: "9981",
      status: "in-progress"
    };

    const response = await request(app)
      .post('/tasks')
      .send(invalidTypePayload);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid task data");
    expect(response.body).toHaveProperty('errors');
  });

});