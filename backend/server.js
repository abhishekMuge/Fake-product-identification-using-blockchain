const express = require('express')
const router = express.Router()
require('dotenv').config()
require('./config')
const axios = require('axios');
var cors = require('cors')

const app = express()

const corsOptions = {
    origin: '*',            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const { registerUser } = require('../backend/userController');

const register = router.post('/register', registerUser);
app.use(register)

app.listen(process.env.PORT, () => console.log('server running on port 8000'))