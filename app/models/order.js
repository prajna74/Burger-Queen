const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        default:"COD"
    },
    items:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"order_placed"
    }
},{timestamps:true});

module.exports=mongoose.model("customer_order",orderSchema);