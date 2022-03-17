const express = require("express")
const mongoose = require('mongoose');
<<<<<<< Updated upstream 
=======

const {
MONGO_USER, 
MONGO_PASSWORD, 
MONGO_IP, 
MONGO_PORT,
} = require("./config/config");
 

const postRouter = require('./routes/postRoutes')
>>>>>>> Stashed changes

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const app = express()

const mongoURL= `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose.
    connect(mongoURL)
    .then(() => console.log("sccesfully connected to DB"))
    .catch((e) => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    });
    
}

connectWithRetry();

app.get("/" ,(req,res) => {
    res.send("<h2> Hello There Node and docker-compose</h2>")
})

app.use("/api", postRouter)
const port = process.env.PORT || 3000;
app.listen(port,() => console.log('listening on port ${port}'))




app.use("/api", postRouter)
<<<<<<< Updated upstream
app.listen(port,() => console.log('listening on port ${port}'))
=======
>>>>>>> Stashed changes
