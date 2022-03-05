const router = require('express').Router();
const { json } = require('express');
const { check, validationResult } = require('express-validator');

let Student = require('../models/Student');

//get all students
//returns just course ids for course info
router.route('/').get((req, res) => {
    Student.find()
        .then(students =>  res.json(students))
        .catch(err => res.status(400).json('Error ' + err));
});

//get student by id
//returns full course info
router.route('/:id').get((req, res) => {
    Student.findById(req.params.id).populate("courses")
    .then(foundCourses => res.json(foundCourses))
    .catch(err => res.status(400).json('Error ' + err));
});

//create new student
router.route('/').post(
    [
        check('fname', 'Please enter your first name').not().isEmpty(),
        check('lname', 'Please enter your last name').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        } else{
            const fname = req.body.fname;
            const lname = req.body.lname;
            const email = req.body.email;   
            const courses = req.body.courses;

            const newStudent = new Student({
                fname,
                lname,
                email,
                courses
            });
        
            newStudent.save()
                .then(() => res.json('New Student Added!'))
                .catch(err => res.status(400).json('Error ' + err));

        }
});


//update student
router.route('/:id').put(
        [
        check('fname', 'Cannot update to empty first name').not().isEmpty(),
        check('lname', 'Cannot update to empty last name').not().isEmpty(),
        check('email', 'Cannot update to invalid email').isEmail()
        ],
        (req, res) => {
        Student.findById(req.params.id)
            .then(student => {
                student.fname = req.body.fname;
                student.lname = req.body.lname;
                student.email = req.body.email;
                student.courses = req.body.courses;

                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.status(422).json({errors:errors.array()});
                } else {
                    student.save()
                    .then(() => res.json('Student updated'))
                    .catch(err => res.status(400).json('Error updating student'));
                }
  
            })
            .catch(err => console.log('error'));
 });



module.exports = router;