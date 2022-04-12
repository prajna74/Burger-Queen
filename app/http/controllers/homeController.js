const burgers=require("./../../models/menus");
function homeController(){
    return{
        index:async (req,res)=>{
            const burger=await burgers.find();
            res.render("home",{burgers:burger});
        }
    }
}
module.exports=homeController;