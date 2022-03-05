const router = require('express').Router();
const { json } = require('express');
const { check, validationResult } = require('express-validator');

let Course = require('../models/Course');

//get all courses
router.route('/').get((req, res) => {
    Course.find()
        .then(courses =>  res.json(courses))
        .catch(err => res.status(400).json('Error ' + err));
});

//get course by id and display full student info
router.route('/:id').get((req, res) => {
    Course.findById(req.params.id).populate('students')
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error ' + err));
});

//create new course
router.route('/').post(
    [
        check('title', 'Please enter course title').not().isEmpty(),
        check('description', 'Please enter course description').not().isEmpty(),
        check('credits', 'Please enter course credits from range 1-5').isInt({min: 1, max: 5}),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        } else{

            const title = req.body.title;
            const description = req.body.description;
            const credits = req.body.credits;
        
            const newCourse = new Course({
                title,
                description,
                credits
            });
        
            newCourse.save()
                .then(() => res.json('New Course Added!'))
                .catch(err => res.status(400).json('Error ' + err));

        }
});


//update course
router.route('/:id').put(
        [
        check('title', 'Updated title cannot be empty').not().isEmpty(),
        check('description', 'Updated description cannot be empty').not().isEmpty(),
        check('credits', 'Updated credits cannot must be integer in range 1-5').isInt({min: 1, max: 5}),
        ],
        (req, res) => {
        Course.findById(req.params.id)
            .then(course => {
                course.title = req.body.title;
                course.description = req.body.description;
                course.credits = req.body.credits;
                course.students = req.body.students;

                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.status(422).json({errors:errors.array()});
                } else {
                    course.save()
                    .then(() => res.json('Course updated'))
                    .catch(err => res.status(400).json('Error updating course'));
                }
             
            })
            .catch(err => console.log('error'));
 });
    

module.exports = router;