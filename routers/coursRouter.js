const express = require('express');
const router = express.Router();
const courseController = require('../Controllers/coursController');

// Routes
router.post('/addcourses', courseController.createCourse);
router.get('/getcourses/:id', courseController.getCourse);
router.put('/updatecourses/:id', courseController.updateCourse);
router.delete('/deletecourses/:id', courseController.deleteCourse);


module.exports = router;