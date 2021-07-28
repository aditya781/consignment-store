const express=require("express");
const ejs=require("ejs");
const bcrypt=require("bcrypt");
require("./mongoose.js");
const bodyParser=require("body-parser");
const app=express();
const User=require(__dirname + "/modules/users.js");
const Item=require(__dirname + "/modules/items.js");
const Inventary=require(__dirname + "/modules/inventary.js")
const multer=require("multer");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

const saltRounds=10;
var userInventary=0;
var erro="";
var arr=[]

const fileStorageEngine=multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null, "./public/img");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + "--" +file.originalname);
    },
});

const upload=multer({storage: fileStorageEngine});


app.get("/",function(req,res){  
    
    
    res.render("login.ejs",{error:""});
    
});
app.get("/sell",function(req,res){  

    Item.find({phone:userInventary}, function(err,foundUser){
        if(foundUser){
            //console.log(foundUser);
            res.render("sell.ejs", {invItems:foundUser, error:erro});
        }
    })
    
   // res.render("sell.ejs");
    
});

app.get("/donate",function(req,res){  

    Item.find({phone:userInventary, category:"Donate"}, function(err,foundUser){
        if(foundUser){
            //console.log(foundUser);
            res.render("donate.ejs", {invItems:foundUser, error:erro});
        }
    })
    
   // res.render("sell.ejs");
    
});

app.get("/shop",function(req,res){  
    
    erro=""
    Item.find({}, function(err,foundUser){
        if(foundUser){
            console.log(foundUser);
            res.render("shop.ejs", {invItemsShop:foundUser});
        }
    })
    //res.render("shop.ejs");
    
});

app.get("/book",function(req,res){  
    
    erro=""
    Item.find({category:"Book"}, function(err,foundUser){
        if(foundUser){
            console.log(foundUser);
            res.render("book.ejs", {invItemsBook:foundUser});
        }
    })
    //res.render("shop.ejs");
    
});
app.get("/stationery",function(req,res){  
    
    erro=""
    Item.find({category:"Stationery"}, function(err,foundUser){
        if(foundUser){
            console.log(foundUser);
            res.render("stationery.ejs", {invItemsBook:foundUser});
        }
    })
    //res.render("shop.ejs");
    
});

app.get("/electronics",function(req,res){  
    
    erro=""
    Item.find({category:"Electronics"}, function(err,foundUser){
        if(foundUser){
            console.log(foundUser);
            res.render("electronics.ejs", {invItemsBook:foundUser});
        }
    })
    //res.render("shop.ejs");
    
});
app.get("/homeApp",function(req,res){  
    
    erro=""
    Item.find({category:"Other"}, function(err,foundUser){
        if(foundUser){
            console.log(foundUser);
            res.render("homeApp.ejs", {invItemsBook:foundUser});
        }
    })
    //res.render("shop.ejs");
    
});

app.get("/home",function(req,res){  
    
    erro=""
    console.log("userInventary = "+ userInventary);
    res.render("home.ejs",{error:""});
    
    
});

app.get("/registerPage",function(req,res){  
    
    res.render("register.ejs",{error:""});
    
});


app.get("/productPage/:id",function(req,res){  
    
    err=""
    console.log(req.params.id)
    Item.find({_id:req.params.id}, function(err,foundUser){
        if(foundUser){
            console.log(foundUser);
            arr=foundUser;
            res.redirect("/product")
           // res.render("product.ejs", {itemId:foundUser});
        }
    })

    
   
    
});

app.get("/product", function(req, res){
    User.find({phone:arr[0].phone}, function(err,foundUser){
        if(foundUser){
            res.render("product.ejs",{productItem:arr, userItem:foundUser})
        }
    })
   // res.render("product.ejs",{productItem:arr})
})

app.get("/deleteItem/:id",function(req,res){  
    
    erro="Item deleted Successfuly!!"
    console.log(req.params.id)
    Item.deleteOne({_id:req.params.id}, function(err,foundUser){
        
        res.redirect("/sell")
    })
    
});

app.get("/deleteDonate/:id",function(req,res){  
    
    erro="Item donated Successfuly!!"
    console.log(req.params.id)
    Item.deleteOne({_id:req.params.id}, function(err,foundUser){
        
        res.redirect("/donate")
    })
    
});


app.get("/logout", function(req,res){
    userInventary=0;
    res.redirect("/")
})



app.post("/login", function(req,res){

    
    const phoneNumber= req.body.fphone;
    const password= req.body.fpassword;

    console.log(req.body);
   
    User.findOne({phone:phoneNumber}, function(err,foundUser){
        if(err){
            
            console.log(err);
            
        }
        else if(foundUser==null){
            res.render("login.ejs",{error:"Enter valid phone number"});
        }
        else{
            if(foundUser){
                console.log(foundUser)
                userInventary=phoneNumber;
                bcrypt.compare(password, foundUser.password, function(erro, respo){
                    if(respo==true){
                        //res.send("<h1>You are logged in</h1>");
                        res.render("home.ejs", {error:""})
                    console.log(foundUser)
                    console.log("userInventary = "+ userInventary);
                    }
                    else{
                        res.render("login.ejs",{error:"Please enter correct password"});
                    }
                });
               
            }
        }
    });
   
});

app.post("/register", function(req,res){
    
    bcrypt.hash(req.body.fpassword, saltRounds, function(err, hash){
        const newUser=new User({
            name:req.body.fname,
            phone:req.body.fphone,
            email:req.body.femail,
            //callege:req.body.fcallege,
            password:hash
            
        });
    
    
        User.findOne({phone:req.body.fphone}, function(err,foundUser){
            if(err){
                
                console.log(err);
                
            }
            else if(foundUser==null){
    
                newUser.save(function(erro){
                    if(erro){
                        console.log(erro);
                    }else{

                        if(req.body.fphone.length<10 || req.body.fpassword.length<6){
                            res.render("register.ejs",{error:"Enter valid phone number or password"}); 
                        }
                        else{
                            userInventary=req.body.fphone;
                        //res.send("<h1>Registration done</h1>");
                        res.render("home.ejs", {error:""});
                        }
                        
                    }
                }); 
            }
            else{
                res.render("register.ejs",{error:"User already exists"}); 
            }
            
        });

    });
    
   
    
              
   

});


app.get("/inventary", function(req, res){
    
})

app.post("/item", upload.single("filename"), function(req,res){

   
   console.log(req.file);

    const newItem= new Item({
        name:req.body.fname,
        author:req.body.fauthor,
        itemType:req.body.fitemType,
        price:req.body.fprice,
        description:req.body.fdescription,
        category:req.body.fcategory,
        phone:userInventary,
        image:req.file.filename
    });

   // console.log(newItem)
   if(userInventary==0){
    res.render("sell.ejs", {invItems:[], error:"Please login to sell the items."})
   }
   else{
       
    newItem.save(function(err){
        if(err){
            console.log(err);
        }else{

            
                erro="Items inserted successfuly !!"
                res.redirect("/sell");
            
        }
    });   

   }   

})


app.post("/itemDonate", upload.single("filename"), function(req,res){

   
    console.log(req.file);
    var newName="Donation : "+ req.body.fname;
     const newItem= new Item({
         name:newName,
         author:req.body.fauthor,
         itemType:req.body.fitemType,
         price:0,
         description:req.body.fdescription,
         category:req.body.fcategory,
         phone:userInventary,
         image:req.file.filename
     });
 
    // console.log(newItem)
    if(userInventary==0){
     res.render("donate.ejs", {invItems:[], error:"Please login to sell the items."})
    }
    else{
        
     newItem.save(function(err){
         if(err){
             console.log(err);
         }else{
 
             
                 erro="Items inserted successfuly !!"
                 res.redirect("/donate");
             
         }
     });   
 
    }   
 
 })
 
 


app.post("/search", function(req, res){
    const searchFeild=req.body.fsearch;
    Item.find({name:{$regex: searchFeild, $options: '$i'}}).then(data=>{
        //res.send(data);
        res.render("search.ejs", {invItemsSearch:data})
        //console.log(data);
    })
});


app.get("/search2/:name", function(req,res){
    var regex=new RegExp(req.params.name, 'i');
    Item.find({name:regex}).then((result)=>{
        res.status(200).json(result)
    
    })
})


app.post("/delete/:name", function(req, res){

})

app.listen(process.env.PORT || 3000, function(){
    console.log("server started on port 3000");
})