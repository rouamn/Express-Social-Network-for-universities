const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    chapterImage: {
        type: String,
        required: false,
    },
    chapterName: {
        type: String,
        required: true,
    },
    chapterDescription: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    chapterVideos: [
        {
            videoId: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'Video',
            },
        },
    ],
    questions :  [
        {
            titre : String,
            options: [
            {
               option: String ,
               isCorrect : Boolean
            },]
        },
        
    ],
    
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
