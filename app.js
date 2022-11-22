import express from 'express'
//import cors from 'cors'
import connectDb from './config/connectiondb.js'
import dotenv from 'dotenv'
dotenv.config()
import routers from './Routers/userRouters.js'

//app.use(cors())
const app = express()

//JSON
app.use(express.json())

//const userRouters = routers


//load routes
app.use("/api", routers)


const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

connectDb(DATABASE_URL)




app.listen(port, () =>{ 
    console.log(`server listing at http://locahost:${port}`)
})