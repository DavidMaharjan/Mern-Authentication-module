
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 9000
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
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

//clothes schema
const clothesSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true }, // e.g., "Shirts", "Pants", "Dresses"
  sizes: { type: [String], required: true }, // e.g., ["S", "M", "L", "XL"]
  colors: { type: [String], required: true }, // e.g., ["Red", "Blue", "Black"]
  stock: {
    type: Map, 
    of: Number, 
    required: true, 
    default: {} 
  }, // Map of size to stock, e.g., {"S": 10, "M": 15}
  images: { type: [String] }, // URLs of product images
  brand: { type: String},
  material: { type: String}, // e.g., "Cotton", "Polyester"
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    total_reviews: { type: Number, default: 0 }
  },
  tags: { type: [String], default: [] }, // Keywords for search, e.g., ["casual", "summer"]
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

clothesSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Products = mongoose.model('Clothes', clothesSchema);


// Exporting the model
const User = mongoose.model('User', userRegistrationSchema);


app.get('/users', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//User registraion
app.post('/register', async(req, res) => {
  const isExist = await User.exists({email:req.body.email})
  console.log(isExist)
  if(isExist) return res.send('Email is taken')

  req.body.password=await(bcrypt.hash(req.body.password, saltRounds))

  User.create(req.body)
  res.send('User created successfully')
  
})

//login of Users
app.post('/login', async(req, res) => {
  const user = await User.findOne({email:req.body.email})
  if(!user) return res.send("Email doen not exist")
  //console.log(user)
  
  
  const isMatched= await bcrypt.compare(req.body.password,user.password)
  //console.log(isMatched)
  if(!isMatched) return res.send('Invalid Password')
  const token = jwt.sign({ email: req.body.email}, '1e0e5c064cc1ae760f73287bd958cb30e07cd69d4c8a6288e0424cb3db36aa335de883b2eff1a2ae3b4d2d2904564d73ef4f1fe1ab87aa83d4d804af20f03fcd614c36db3051b8e4abecb12f842d06c8e9d766ba244db918d508d77633cc8da11c16f18b348d4947d7768d48ad258d6e7225edb2b5125f4da694d178a0449083');
  res.send({
    token , user
  })

})

//Product listing
app.post('/products',async(req,res)=> {
  Products.create(req.body)
  res.send("Product listed successfully")
}
)

app.get('/products',async(req,res)=> {
  const product =await Products.find()
  res.send(product)
}
)

