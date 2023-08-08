const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const registerRoutes =require('./routes/Rgister');
const ProductsRoutes=require('./routes/Products');
const CartRoutes=require('./routes/Cart');
const app=express();
//cors
var cors = require('cors');
const corsOpts = {
    origin: '*',
    credentials:true,
    methods: [
        'GET',
        'POST',
    ],
    allowedHeaders: [
        'Content-Type','Authorization'
    ],
};
  
app.use(cors(corsOpts));

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

//db connection
const dbUrl='mongodb://localhost:27017/ecommerce';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3001, () => console.log('port open')))
    .catch((err) => console.log(err))

//routes

app.use(ProductsRoutes);
app.use(registerRoutes);
app.use(CartRoutes);