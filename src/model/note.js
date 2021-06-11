const mongoose =require('mongoose');
const noteSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true,min:3,max:20},
    body:[{type:String,required:true}]
},{timestamps:true});
module.exports=mongoose.model('Notes',noteSchema);