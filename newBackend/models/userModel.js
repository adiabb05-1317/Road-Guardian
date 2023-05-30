const mongoose=require('mongoose')
const schema=mongoose.Schema
const userSchema=new schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
password:{
    type:String,
    required:true,
    minlength:10,
    trim:true
},
})
module.exports=mongoose.model('User',userSchema)