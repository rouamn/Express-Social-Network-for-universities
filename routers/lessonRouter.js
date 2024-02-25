const express = require('express');
const router = express.Router();
const lessonController = require('../Controllers/lessonController');

// Routes
router.post('/addlessons', lessonController.createLesson);
router.get('/getlessons/:id', lessonController.getLesson);
router.put('/updatelessons/:id', lessonController.updateLesson);
router.delete('/deletelessons/:id', lessonController.deleteLesson);

module.exports = router;