const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
 

const employeeRoutes = require('./routes/employee');

const app = express();
app.use(bodyParser.json());

 
app.use(helmet());

 
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour.',
});
app.use('/api', limiter);

 
app.use(mongoSanitize());
 
const uri = process.env.MONGODB_URI;
 
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

 
app.use('/employees', employeeRoutes);
 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
