const mongoose=require('mongoose');
const validator=require('validator');


const Inventary=mongoose.model('Inventary',{
    userPhone:{
        type:Number,
        trim:true,
        //required:true
    },

    itemId:{
        type:String,
        trim:true
    }
   
})



module.exports=Inventary;