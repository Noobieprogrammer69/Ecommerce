require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors");
const express = require("express")
const cookieParser = require("cookie-parser")
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY); 
const path = require("path")

const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const buyingRoutes = require("./routes/buyingRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use('/api', productRoutes);
app.use('/api/buyingProducts', buyingRoutes);

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

const PORT = process.env.PORT || 5000
const URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(URI, {})
        console.log(`MongoDB is connected: ${connect.connection.host}`)
    } catch (error) {   
        console.log(`MongoDB ERROR: ${error.message}`)
        process.exit()
    }
}

connectDB()

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})
