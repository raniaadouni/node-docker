const express = require("express")
const mongoose = require('mongoose');
let bodyParser = require("body-parser")
const session = require("express-session")
//const cookieParser = require("cookie-parser")

let RedisStore = require("connect-redis")(session)

const redis = require("redis")

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT,  
    SESSION_SECRET,
    REDIS_PORT,
    REDIS_IP,
} = require("./config/config");

const redisClient = redis.createClient({
    legacyMode: true,
    host: REDIS_IP,
    port: REDIS_PORT
})


const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

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

app.get(express.json())
app.use(bodyParser.json()) 

//express behind proxies
app.enable("trust proxy")

//Configure session middleware
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60000
        }

    }))

app.get("/api" ,(req,res) => {
    res.send("<h2> Hello There Node and docker-compose</h2>")
    console.log("hello again")
})

app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)
const port = process.env.PORT || 3000;
app.listen(port,() => console.log('listening on port ${port}'))