require("dotenv").config()
const express=require("express");
const path=require("path");
const app=express();
const ejs=require("ejs");
app.set("view engine","ejs");
const expressLayouts=require("express-ejs-layouts");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(expressLayouts);
app.set("views",path.join(__dirname,"resources/views"));
app.set("layout","layouts/layout.ejs");
app.use(express.static("public"));
const session=require("express-session");
const passport=require("passport");
const MongoStore=require("connect-mongo");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/burger_queen");
const connection=mongoose.connection;
app.use(session({
       secret:process.env.COOKIE_SECRET,
       resave:false,
       store:MongoStore.create({
             mongoUrl:"mongodb://localhost/burger_queen",
             ttl:1000*60*60*24
       }),
       saveUninitialized:false,
       cookie:{maxAge:1000*60*60*24}
}));
const flash=require("express-flash");
app.use(flash());

app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.session.user;
    next(); 
})
// const passportinit=require("./app/config/passport");
// passportinit(passport);
// app.use(passport.initialize());
// app.use(passport.session());
const routes=require("./routes/web");
routes(app);


const server=app.listen(process.env.PORT||3000);


const io=require("socket.io")(server);

io.on("connection",()=>{

})


