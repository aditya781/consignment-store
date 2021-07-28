const mongoose=require('mongoose');
const validator=require('validator');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        minLength:10
    },
    email:{
        type:String,
        validator(value){
            if(!validator.isEmail(value)){
                throw new console.error("Please enter valid email....");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        //minLength:6,
        required:true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new console.error("Please enter valid password...")
            }
        }
    },
    callege:{
        type:String,
        default:"Pune Institute of Computer Technology"
    },
   
});




const User=new mongoose.model('User',userSchema);
//const secret="thisisourlargelittlesecret.";
//userSchema.plugin(encrypt,{secret:secret, encryptedFeilds:[password]});
//


/*const User=mongoose.model('User',{
    name:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        minLength:10
    },
    email:{
        type:String,
        validator(value){
            if(!validator.isEmail(value)){
                throw new console.error("Please enter valid email....");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        minLength:6,
        required:true
    },
    callege:{
        type:String,
        default:"Pune Institute of Computer Technology"
    },
    address:{
        type:String
        
    }
})



module.exports=User;*/

module.exports=User;



//so for saving data in database, use
//cont user1=new User({   queries});
//user1.save();
//or use Modelname.insertMany({user1,user2,user3},func(err){if(err){}else print})


/*collectionName.find(function(error, collections){
    if(eror){
        print(error)
    }
    else{
        print(collections)
    }
})


mongoose.connection.close()     for closing connection
*/