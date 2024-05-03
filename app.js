// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://amannarula099:123@cluster0.afdtrzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  location: String,
  guest: Number,
  start: Date,
  end: Date
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.render('register');
});

// Route to handle form submission
// Define route to handle form submission
app.post('/register', (req, res) => {
  const { location, guest, start, end } = req.body;
  
  const newUser = new User({
    location,
    guest,
    start,
    end
  });
  
  newUser.save()
    .then(() => {
      // res.send('User registered successfully!');
      res.redirect('/index.html')
    })
    .catch((err) => {
      console.error('Error registering user:', err.message);
      res.status(500).send('Error registering user');
    });
});

// Assuming you have a route to render the index page
app.get('/', (req, res) => {
  res.render('index');
});
// Start the server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});