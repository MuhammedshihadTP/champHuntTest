
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user');
const app = express();
const port = 5000;



app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/champHunt',).then(()=>console.log("mongo connected")).catch((error)=>console.log(error));



app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).send('All fields are required');
    }

    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ email, password, name });
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
