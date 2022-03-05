const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema( {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true
    },
    students: 
        [{
            type: mongoose.Schema.ObjectId,
            ref : 'Student'
        }]

}, {timestamps: true} );

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;