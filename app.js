import express from "express";
import cors from "cors";
import connectDb from "./dbconnection/connectionDB.js";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRouters.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRouters.js"
import path from "path"
import * as url from 'url';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

connectDb(DATABASE_URL);

   // const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const static_path=path.join(__dirname,"./public")
   
//JSON
app.use(express.json());
app.use(express.static(static_path));
//load routes
app.get("/",(req,res)=>{
  console.log(static_path)
  res.send("hello")
})
app.use("/api", userRoutes);
app.use("/api",adminRoutes)
app.listen(port, () => {
  console.log(`server listing at http://locahost:${port}`);
});
