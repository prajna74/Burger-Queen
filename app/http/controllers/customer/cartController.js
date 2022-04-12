function cartController(){
    return{
        index:(req,res)=>{
            res.render("customers/cart");
        },
        updateCart:(req,res)=>{
            if(!req.session.cart){
               const cartt={
                   items:{},
                   totalQt:0,
                   totalAmt:0
               };
               req.session.cart=cartt;
            }
            let cart=req.session.cart;
            if(!cart.items[req.body._id])
            {
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                };
                cart.totalQt+=1;
                cart.totalAmt+=req.body.price;
            }
            else{
                cart.items[req.body._id].qty+=1
                cart.totalQt+=1;
                cart.totalAmt+=req.body.price;
            }
            return res.json({totalqt:req.session.cart.totalQt});
        }
    }
}
module.exports=cartController;