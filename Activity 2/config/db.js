import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

// **NOTE TO START **
//on linux I need this, on windows I don't
//nodemon --experimental-modules --es-module-specifier-resolution=node server.js 

//connect to mongodb
const connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
        
    } catch (err) {
        console.log("Error Occurred", err.message);
        process.exit(1);
    }
};

export default connectDatabase;
