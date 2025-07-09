import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import travelStoryRoutes from "./routes/travelStory.route.js"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(
    ()=>
    {
        console.log("Database is connected")
    }
).catch((err)=>{
    console.log(err)
})

const PORT=process.env.PORT || 3000

const app=express()

//enable cors 
app.use(cors({
    origin:"https://travel-diary-frontend-six.vercel.app",
    methods:["GET","PUT","POST","DELETE"],
    credentials: true, //allow cookie and authorization error
}))



app.use(cookieParser())


app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend is running  ");
});

app.listen(PORT,()=>{
    console.log("Server is listening");
})

app.use("/api/auth", authRoutes)

app.use("/api/user", userRoutes)
app.use("/api/travel-story", travelStoryRoutes)

 //server static files from the uploads and assets directory
 const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/assets", express.static(path.join(__dirname,"assets")))

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500

    const message =err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

export default app