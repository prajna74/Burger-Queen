const User = require("../../models/user");
const bcrypt=require("bcrypt");
function authController(){
    return{
        login:(req,res)=>{
           res.render("auth/login");
        },
        register:(req,res)=>{
             res.render("auth/register");
        },
        registerpost:async (req,res)=>{
             const {name,email,password} = req.body;
             if(!name || !email || !password)
             {
                 req.flash("error","All fields required");
                 req.flash("name",name);
                 req.flash("email",email);
                 res.redirect("/register");
             }
             const hashedPassword=await bcrypt.hash(password,10);
             const user=new User({
                 name:name,
                 email:email,
                 password:hashedPassword
             });
             user.save().then(()=>{
                 res.redirect("/login");
             }).catch(err=>{
                req.flash("error","Something went wrong");
             });
        },
        postlogin:async (req,res)=>{
            const {email,password}=req.body;
            if(!email & !password)
            {
                req.flash("error","Missing credentials");
                res.redirect("/login");
            }
            if(!password)
            {
                req.flash("error","Please enter password");
                req.flash("email",email);
                res.redirect("/login");
            }
           const users=await User.findOne({email:req.body.email});
           try{
               if(users==null)
               {
                  req.flash("error","No user found!Please register");
               }
               else{
                if(await bcrypt.compare(req.body.password,users.password))
                {
                        req.session.user={user:users};
                         res.redirect("/");
                }
                else{
                    req.flash("error","Invalid credentials");
                    res.redirect("/login");
                }
           }
        }
           catch(err)
           {
               res.redirect("/register");
               console.log(err);
           }     
        },
        logout:(req,res)=>{
          if(req.session.user)
          {
              req.session.destroy();
              res.redirect("/");
          }
        }
    }
}
module.exports=authController;