jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: () => ({
      add: jest.fn().mockResolvedValue({ id: 'mock-task-id-123' })
    })
  })
}));

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

  it('should return 201 Created if task data is completely valid', async () => {
    const validPayload = {
      title: "Check kennel inventory",
      clinicId: "CL-4452",
      status: "pending"
    };

    const response = await request(app)
      .post('/tasks')
      .send(validPayload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.id).toBe('mock-task-id-123'); 
  });

});