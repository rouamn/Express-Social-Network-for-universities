const express = require('express');
const userAuth = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCoursesBySearch,
  getCoursesByTag,
  getRelatedCourses,
  likeCourse,
  getCoursesWithUserId,
  getCourseImage,
} = require('../Controllers/coursecontroller');

const router = express.Router();
// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './routers/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// Route for handling file upload
router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

router.post('/createcourse', createCourse);
router.get('/getcourses', getCourses);
router.get('/getcourse/:id', getCourse);
router.put('/updatecourse/:id', updateCourse);
router.delete('/deletecourse/:id', deleteCourse);
router.get('/searchcourses', getCoursesBySearch);
router.get('/tagcourses/:tag', getCoursesByTag);
router.post('/relatedcourses', upload.single('file'), getRelatedCourses);
router.put('/likecourse/:id', userAuth, likeCourse);
router.get('/getusercourses/:id', getCoursesWithUserId);

router.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '/uploads/', filename);
  try {
    if (fs.existsSync(filePath)) {
      res.download(filePath, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).json({ message: 'Failed to download file' });
        }
      });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Failed to download file' });
  }
});
router.get('/previewImage/:filename', getCourseImage);
module.exports = router;
