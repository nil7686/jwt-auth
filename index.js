//import express, { Router } from 'express'
import express from 'express'
import connectDB from './dbconnection/connectDB.js'
//import './models/Students.js'
import './routes/routers.js'
import routers from './routes/routers.js'
import bodyparser from 'body-parser'

const app = express()
const allrouters = routers
app.use(bodyparser.json())
app.use("/api",allrouters)

const port = process.env.PORT|| '4000'

const db_url =  process.env.db_url|| "mongodb://localhost:27017/schooldb"

connectDB(db_url);



app.listen(port, () =>{
    console.log('server listing at http://locahost:${port}')
})





