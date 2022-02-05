const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000; 


app.get('/', (req, res) => {
    res.send('Hello from express server');
})

app.listen(3000, () => console.log(`Express running on port ${port}`));

