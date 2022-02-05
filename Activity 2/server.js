import express from 'express';
import connectDatabase from './config/db';


const app = express();

//connect to mongodb
connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello from express server');
})

app.listen(3000, () => console.log(`Express running on port 3000`));

