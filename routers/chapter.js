const express = require('express');
const router = express.Router();
const chapterController = require('../Controllers/chapterController');

router.post('/addchapter', chapterController.addNewChapter);
router.get('/getallchapter', chapterController.getAllChapters);
router.get('/:id', chapterController.getChapterById);
router.put('/:id', chapterController.updateChapter);
router.delete('/:id', chapterController.deleteChapter);

module.exports = router;
