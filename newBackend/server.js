const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const connectDB=require('./db')
connectDB()
const app=express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use('/users',require('./routes/userRouter'))
app.use('/complaint',require('./routes/complaintRoutes'))
app.listen(3001,()=>{
    console.log("Server is running on port 3001")
})
