// import express from 'express';
// import connectDatabase from './config/db';
// import {check, validationResult} from 'express-validator';
// import cors from 'cors';

const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');

const app = express();

//connect to mongodb
connectDatabase();

//middleware
app.use(express.json({ extended: false}));
app.use(
    cors({
        origin:'http://localhost:3000'
    })
);

//I separated out routes to their own class as this seems to be very common after looking at documentation and tutorials
const studentRouter = require('./routes/students');
const courseRouter = require('./routes/courses');

app.use('/students', studentRouter);
app.use('/courses', courseRouter);

const port = 5000;
app.listen(port, () => console.log(`Express running on port ${port}`));

