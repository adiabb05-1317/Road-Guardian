const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const connect=mongoose.connect('mongodb+srv://adi123:abb131705@cluster0.kugtute.mongodb.net/Road?retryWrites=true&w=majority')
        console.log("MongoDB connected")
        

    }
    catch(err){
        console.log(err)
        process.exit(1)

    }
}
module.exports=connectDB