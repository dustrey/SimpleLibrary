require('dotenv').config({ path: './.env' });
console.log(process.env.ATLAS_URI);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const books = require('./books');

app.use(cors());
app.use(bodyParser.json());
app.use('/books', books);

mongoose.connect(process.env.ATLAS_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB!'))
.catch (err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});