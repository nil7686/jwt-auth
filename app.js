import express from 'express'
import cors from 'cors'
import connectDb from './config/connectiondb.js'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/userRoutes.js'

//app.use(cors())
const app = express()




const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

connectDb(DATABASE_URL)

//JSON
app.use(express.json())

//load routes
app.use("/api", userRoutes)

app.listen(port, () =>{ 
    console.log('server listing at http://locahost:${port}')
})