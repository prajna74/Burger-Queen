const mongoose=require("mongoose");
const menuSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("menu",menuSchema);