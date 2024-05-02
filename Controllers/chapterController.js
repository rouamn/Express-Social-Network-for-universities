const Chapter = require('../Models/chapter');

const addNewChapter = async (req, res) => {
    const chapter = new Chapter(req.body);

    try {
        await chapter.save();
        res.status(201).send(chapter);
    } catch (e) {
        res.status(400).send(e);
    }
};

const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.send(chapters);
    } catch (e) {
        res.status(500).send();
    }
};

const getChapterById = async (req, res) => {
    const _id = req.params.id;

    try {
        const chapter = await Chapter.findById(_id);
        if (!chapter) {
            return res.status(404).send();
        }
        res.send(chapter);
    } catch (e) {
        res.status(500).send();
    }
};

const updateChapter = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['chapterImage', 'chapterName', 'chapterDescription', 'tag', 'chapterVideos'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const chapter = await Chapter.findById(req.params.id);

        if (!chapter) {
            return res.status(404).send();
        }

        updates.forEach((update) => (chapter[update] = req.body[update]));
        await chapter.save();
        res.send(chapter);
    } catch (e) {
        res.status(400).send(e);
    }
};

const deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndDelete(req.params.id);

        if (!chapter) {
            return res.status(404).send();
        }

        res.send(chapter);
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = {
    addNewChapter,
    getAllChapters,
    getChapterById,
    updateChapter,
    deleteChapter,
};
