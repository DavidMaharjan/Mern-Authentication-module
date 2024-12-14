
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 9000
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ecommercedb');

const {Schema} = mongoose;
const userRegistrationSchema = new Schema({
  user_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    country: { type: String, required: true }
  },
  registration_date: { type: Date, default: Date.now },
  preferences: {
    newsletter_subscribed: { type: Boolean, default: false },
    preferred_language: { type: String, default: 'en' }
  }
});

// Exporting the model
const User = mongoose.model('User', userRegistrationSchema);


app.get('/users', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

  User.create(req.body)
  res.send('User created successfully')
})

app.post('/login', (req, res) => {


})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
