const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./Course');

const studentSchema = new Schema( {
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },

    courses:  
        [{
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        }]
    
}, {timestamps: true} );

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;