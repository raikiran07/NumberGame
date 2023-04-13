const express = require('express')
require('dotenv').config()
const connectDB = require("./database/connect")
const app = express()
const router = require('./routes/user')
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(router)

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000,()=>{
            console.log("app is running on port number 3000")
        })
    } catch (error) {
        console.log(error.message)
    }
} 

start()