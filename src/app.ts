import express from 'express'

import authRoutes from "./routes/authRoutes";
import taskRoutes from './routes/taskRoutes'
const app = express()

//Middleware
app.use(express.json());

//Routes
app.get('/', (req,res)=>{
    res.send("Working smoooooth")
})


app.use('/auth', authRoutes)
app.use("/api", taskRoutes);

export default app