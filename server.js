const express = require("express");
const app = express();
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb=require('./config/connectDB')
const userRoutes=require('./routes/userRoute')
const transactionRoutes=require('./routes/transactionRoutes')
dotenv.config();
connectDb();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes


app.use('/api/users',userRoutes)

app.use('/api/transactions',transactionRoutes)

const PORT=8080 || process.env.PORT                     

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})