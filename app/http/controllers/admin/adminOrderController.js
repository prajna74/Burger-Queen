const orders=require("./../../../models/order");
const moment=require("moment");
function adminOrderController(){
         return{
            orders:(req,res)=>{
               orders.find({staus:{$ne:"completed"}},null,{sort:{createdAt:-1}})
               .populate("customerId","-password").exec((err,orders)=>{
                   res.render("admin/orders",{orders:orders,moment:moment});
               })
            },
            trackStatus:async (req,res)=>{
               const orderid=await orders.findById(req.body.orderId);
               orderid.status=req.body.status;
               await orderid.save().then((result)=>{
                  res.redirect("/admin/orders");
               })           
         }
      }
}
module.exports=adminOrderController;