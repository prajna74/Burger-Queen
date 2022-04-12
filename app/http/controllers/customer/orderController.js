const Orders=require("./../../../models/order");
const moment=require("moment");
function ordercontroller(){
    return{
      store:(req,res)=>{
          const {phone,address}=req.body;
          if(!phone || !address)
          {
             req.flash("error","Something went wrong!");
             return res.redirect("/cart");
          }
          const order=new Orders({
               phone:phone,
               address:address,
               items:req.session.cart.items,
               customerId:req.session.user.user._id,
          });
          order.save().then((result)=>{
            req.flash("success","Order placed successfully!");
            req.session.cart=null;
            res.redirect("/customer/index");
          }).catch((err)=>{
            res.redirect("/");
          })
      },
      index:async (req,res)=>{
        const orders=await Orders.find({customerId:req.session.user.user._id}).sort({createdAt:-1});
        res.header("Cache-Control","no-cache","private, must-revalidate, max-stale=0,post-check=0,pre-check=0");
        res.render("customers/orders",{orders:orders,moment:moment});
      },
      show:async(req,res)=>{
        const orderid=await Orders.findById(req.params.id);
        res.render("customers/track",{order:orderid});
      }
    }
};
module.exports=ordercontroller;