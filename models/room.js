const mongoose=require('mongoose');
const roomschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount:{
        type:Number,
        required:true
    },
    rentperday:{
        type:Number,
        required:true
    },
    imageurls:[],
    currentbookings:[],
    type:{
        type:String,
        required:true
    },
    descripion:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})
const roomModel=mongoose.model('rooms',roomschema)
module.exports=roomModel