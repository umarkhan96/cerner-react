const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const UserSchema=new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true,
        // unique:true,
    } ,
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
},{timestamp:true});

module.exports = User = mongoose.model("users", UserSchema);

