import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    NIK : {
        type : String,
        required : true,
        unique : true
    },
    phone_number : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

export default mongoose.model("User", UserSchema);