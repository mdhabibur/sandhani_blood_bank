import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './db/connectDB.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true,
}))

const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send('Backend is running...');
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
});