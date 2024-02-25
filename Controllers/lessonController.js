const Lesson = require('../Models/lessonModel');

exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};