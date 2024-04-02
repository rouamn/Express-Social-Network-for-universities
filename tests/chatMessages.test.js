const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const { Server } = require('socket.io');
const { initializeSocket } = require('../socket/socket');

require("dotenv").config();

describe('Chat CRUD', () => {
  let chatId;

  it('should create a new chat', async () => {
    const res = await request(app)
      .post('/chat/create')
      .send({ senderId: 'sender_id', receiverId: 'receiver_id' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.members).toEqual(expect.arrayContaining(['sender_id', 'receiver_id']));
    chatId = res.body._id;
  });

  it('should get chats of a user', async () => {
    const res = await request(app).get('/chat/test_user_id');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('Message CRUD', () => {
  let messageId;
  let chatId;

  it('should add a message to a chat', async () => {
    const res = await request(app)
      .post('/message/add')
      .send({ chatId: chatId, senderId: 'sender_id', type: 'text', text: 'Hello' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    messageId = res.body._id;
  });

  it('should get messages of a chat', async () => {
    const res = await request(app).get(`/message/${chatId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

