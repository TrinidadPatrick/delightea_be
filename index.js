const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const route = require('./Routes')

const http = require('http')
const app = express()
const server = http.createServer(app);

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(cookieParser())
app.use(express.json())

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use("/api",route)

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});