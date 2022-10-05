/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./mongodb/connectDB');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.status(200).send('The server is running');
})

app.use('/api/users', require('./routes/users.route'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
