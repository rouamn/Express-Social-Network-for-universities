const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken');

// Importez les modèles ou les méthodes nécessaires pour simuler les données

require("dotenv").config();
const generateToken = () => {
  const user = { userId: '660ce0b613524192f0c7ba3c' }; 
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
describe('Post CRUD', () => {
  let postId;
  let token;

  beforeAll(() => {
    token = generateToken(); 
  });
//fine
/*
  it('should create a new post', async () => {
    const post = {
      description: 'first test is here  ',
      userId: '660ce0b613524192f0c7ba3c'
    };
    const res = await request(app)
      .post('/posts/create-post')
      .set('Authorization', `Bearer ${token}`)
      .send(post);
  
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.description).toEqual(post.description);
  });*/
//fine
  it('should get posts', async () => {
    const res = await request(app)
      .get('/posts/')
      .set('Authorization', `Bearer ${token}`); 
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBeTruthy(); 
  });

//fine
  it('should get a specific post', async () => {
    const postId = '660db4d98e1f0109cad94c5b'; // Replace with an actual post ID
  
    const res = await request(app)
      .get(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);
  
    console.log('Response body:', res.body); // Log the response body for debugging
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe('object'); // Check that the response body is an object
    expect(res.body.data).toHaveProperty('_id'); // Check if the post object has an _id property
  });
  //fine
  it('should get posts for a specific user', async () => {
    const userId = '660ce0b613524192f0c7ba3c'; // Use the same user ID for testing
    const res = await request(app)
      .post(`/posts/get-user-post/${userId}`) // Utiliser la méthode GET
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  });
  //
  it('should get comments for a specific post', async () => {
    const postId = '660db4d98e1f0109cad94c5b'; 
    const res = await request(app)
      .get(`/posts/comments/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });
//fine
/*
  it('should like a post', async () => {
    const postId = '660db4d98e1f0109cad94c5b'; 
    const res = await request(app)
      .post(`/posts/like/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.likes).toContain('660ce0b613524192f0c7ba3c');
  });
*/
  //fine
  it('should comment on a post', async () => {
    const postId = '660db4d98e1f0109cad94c5b'; 

    const comment = 'This is a test comment.';
    const from = 'Test User';
    const res = await request(app)
      .post(`/posts/comment/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ comment, from });

    expect(res.statusCode).toEqual(201);
    expect(res.body.comment).toEqual(comment);
    expect(res.body.from).toEqual(from);
  });

  it('should reply to a comment on a post', async () => {
    const postId = '660db4d98e1f0109cad94c5b';
    const commentId = '660db8e46007d5a4ca806c55';
    const comment = 'This is a test reply.';
    const from = 'Test User';
  
    const res = await request(app)
      .post(`/posts/reply-comment/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ comment, from });
  
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual('Reply added successfully');
    expect(res.body.data).toBeDefined(); // Vérifiez que les données sont définies
    expect(res.body.data.replies).toContainEqual(expect.objectContaining({ comment, from }));
  });
  
  

/*it('should like a comment on a post', async () => {
    const postId = '660db4d98e1f0109cad94c5b'; 
const commentId='660db6233b5df792a8923609'

  const res = await request(app)
    .put(`/posts/like-comment/${commentId}`)
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toEqual(201);
  expect(res.body.likes).toContain('660ce0b613524192f0c7ba3c');
});
*/
//fine
/*it('should delete a post', async () => {
  const postId = '660d0002834e1165eee8cb95'; 

  const res = await request(app)
    .delete(`/posts/${postId}`)
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toBeTruthy();
});*/





  
  
});
