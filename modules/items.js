const mongoose=require('mongoose');
const validator=require('validator');


const Item=mongoose.model('Items',{
    name:{
        type:String,
        trim:true,
        required:true
    },
    author:{
        type:String,
        
        //required:true

    },
    itemType:{
        type:String,
        trim:true,
        default:"Paperback"
    },
    phone:{
        type:Number
    },
    
    category:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        validator(value){
            if(value<-1){
                return new Error("Price is smaller than 0.");
            }
        }
    
    },
    image:{
        type:String
    },
    description:{
        type: String
    }
})



module.exports=Item;