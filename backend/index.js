const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe');
const app = express();




// Option 1: Allow all origins
app.use(cors());




app.use(express.json({ limit: "5mb" , extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));



const PORT = process.env.PORT || 8080;

// body parser 
app.use(bodyParser.json({ limit: "5mb", extended: true }));



//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // bufferCommands: false,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));



//schema
const userschema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
});
const userModel = mongoose.model("user", userschema);

app.get("/", (req, res) => {
  res.send("server is running");
});





//signup api
app.post("/signup", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      await data.save();
      return res
        .status(201)
        .json({ message: "Successfully sign up", alert: true });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});



//api login
app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      const dataSend = {
        _id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        image: existingUser.image,
      };

      res.send({
        message: "Login is successful",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});



// add new item
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productmodel = mongoose.model("product", schemaProduct);



// saving data in  database
app.post("/uploadproduct", async (req, res) => {
  console.log(req.body);
  const data = await productmodel(req.body);
  const datasave = await data.save();
  res.send({ message: "uploded successfully" });
});


app.get("/product", async (req, res) => {
  try {
    const data = await productmodel.find({});
    res.send(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch product data" });
  }
});


 
// payment gateway
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY ,{
    // apiVersion: '2022-11-15',
    // host: process.env.STRIPE_MOCK_HOST,
    // port: 12111,
    // protocol: 'http',
});

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1NYu2JSG1VYaJyiMdIEUoScC"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/sucess`,
          cancel_url : `${process.env.FRONTEND_URL}/failure`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})
app.listen(PORT, () => console.log("server is running on port : " + PORT));




//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));

