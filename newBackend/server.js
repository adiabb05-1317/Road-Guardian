const express=require('express')
const cors=require('cors')

const connectDB=require('./db')
connectDB()
const app=express()
app.use(cors())
app.use(express.json())


app.use('/users',require('./routes/userRouter'))
app.listen(3001,()=>{
    console.log("Server is running on port 3001")
})

