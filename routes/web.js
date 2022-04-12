const homeController=require("./../app/http/controllers/homeController");
const authController=require("./../app/http/controllers/authController");
const cartController=require("./../app/http/controllers/customer/cartController");
const orderController=require("./../app/http/controllers/customer/orderController");
const guest=require("./../app/http/middlewares/guest");
const order = require("../app/models/order");
const ordercontroller = require("./../app/http/controllers/customer/orderController");
const adminOrderController=require("./../app/http/controllers/admin/adminOrderController");
function allRoutes(app)
{
    app.get("/",homeController().index);
    app.get("/login",guest, authController().login);
    app.get("/register",guest,authController().register);
    app.get("/cart",cartController().index);
    app.post("/update-cart",cartController().updateCart);
    app.post("/register",authController().registerpost);
    app.post("/login",authController().postlogin);
    app.post("/logout",authController().logout);
    app.post("/customer/order",orderController().store);
    app.get("/customer/index",orderController().index);
    app.get("/customer/track/:id",ordercontroller().show);
    app.get("/admin/orders",adminOrderController().orders);
    app.post("/admin/order/status",adminOrderController().trackStatus);
}
module.exports=allRoutes;