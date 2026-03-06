require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const identifyRoute = require("./routes/identify")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
 console.log("MongoDB connected")
})
.catch(err => console.log(err))

app.use("/identify", identifyRoute)

app.listen(process.env.PORT || 3000, () => {
 console.log("Server running on port 3000")
})