// const passport = require("passport");
// const User=require("./../models/user");
// const bcrypt=require("bcrypt");
// const LocalStrategy=require("passport-local").Strategy;
// function init(passort)
// {
//    passport.use(new LocalStrategy({usernameField:"email"},async (email,password,done)=>{
//           const userr=await User.find({email:email})
//           if(password=="")
//           return done(null,false,{message:"Please enter password"});
//           if(!userr){
//               return done(null,false,{message:"User not found"});
//           }
//           bcrypt.compare(password,userr.password).then((match)=>{
//             if(match){  
//             return done(null,userr,{message:"Logged in Successfully"});}
//             else{
//                 return done(null,false,{message:"Wrong username or password"});
//             }
//           }).catch(err)
//           {
//               return done(null,false,{message:"Something went wrong"});
//           }
//    }));
//    passport.serializeUser((user,done)=>{
//        done(null,user._id);
//    });

//    passport.deserializeUser((id,done)=>{
//         User.findById(id,(err,user)=>{
//             done(err,user);
//         })
//    })
// }
// module.exports=init;

 // loginpost:(req,res,next)=>{
        //     passport.authenticate("local",(err,user,info)=>{
        //         if(err)
        //         {
        //             req.flash("error",info.message);
        //             next();
        //         }
        //         if(!user){
        //             req.flash("error",info.message);
        //             res.redirect("/register");
        //         }
        //         req.logIn(user,(err)=>{
        //           if(err){
        //               req.flash("error",info.emssage);
        //               return next(err);
        //           }
        //           res.redirect("/");
        //         })
        //     })(req,res,next)
        // }