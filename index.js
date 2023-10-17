import express from "express"
import {PORT, mongoDBURL} from './config.js'
import mongoose from "mongoose";
import book from './routes/books.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(morgan('dev'))

// app.use(cors());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ['Content-Type']
    })
)


app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
});

app.use('/books', book)

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database')
}).catch((err) => {
    console.log(err)
})