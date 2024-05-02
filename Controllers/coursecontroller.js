const Course = require('../Models/course');
const fs = require('fs');
const path = require('path');
//sonia-gestioncourse
// Créer un cours
exports.createCourse = async (req, res, next) => {
  try {
    const { body } = req;
    const newCourse = await Course.create(body);
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: newCourse,
    });
  } catch (error) {
    console.log('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
};

// Obtenir tous les cours paginés
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

// Obtenir un cours par son ID
exports.getCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne({ _id: id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Failed to fetch course' });
  }
};

// Supprimer un cours
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

// Mettre à jour un cours
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price, video, tags } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        price,
        video,
        tags,
      },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Failed to update course' });
  }
};

// Obtenir les cours par recherche
exports.getCoursesBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const courses = await Course.find({
      title: { $regex: searchQuery, $options: 'i' },
    });
    res.json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ message: 'Failed to search courses' });
  }
};

// Obtenir les cours par tag
exports.getCoursesByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const courses = await Course.find({ tags: tag });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses by tag:', error);
    res.status(500).json({ message: 'Failed to fetch courses by tag' });
  }
};

// Obtenir les cours liés
exports.getRelatedCourses = async (req, res) => {
  const { tags } = req.body;
  try {
    const courses = await Course.find({ tags: { $in: tags } });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching related courses:', error);
    res.status(500).json({ message: 'Failed to fetch related courses' });
  }
};

// Aimer ou désaimer un cours
exports.likeCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const userId = req.userId;
    const index = course.likes.indexOf(userId);
    if (index === -1) {
      // User has not liked the course, so like it
      course.likes.push(userId);
    } else {
      // User has already liked the course, so unlike it
      course.likes.splice(index, 1);
    }
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('Error liking course:', error);
    res.status(500).json({ message: 'Failed to like course' });
  }
};

exports.getCoursesWithUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const courses = await Course.find({ createdBy: id });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses by user id:', error);
    res.status(500).json({ message: 'Failed to fetch courses by user id' });
  }
};

exports.downloadFile = async (req, res) => {
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
};

exports.getCourseImage = async (req, res) => {
  // Assuming you have an image file named 'example.jpg' in the 'images' folder
  const imageUrl = '/images/example.jpg';
  const { filename } = req.params;

  const filePath = path.join(__dirname, '/uploads/', 'eLearning.png');
  res.json(filePath);
};
