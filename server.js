

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const authController = require('./controllers/auth');
const taskRoutes = require('./routes/taskroutes');
const AWS = require('aws-sdk'); 
const app = express();
const dotenv = require('dotenv');
const authenticateJWT = require('./controllers/authmiddleware');
const PORT = process.env.PORT || 5000;

dotenv.config();



app.use(cors());
app.use(bodyParser.json());



connectDB();

app.post('/register', authController.register);
app.post('/login', authController.login);
app.use('/',authenticateJWT, taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
