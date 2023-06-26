import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    photo : {
        type : [String]
    },
    maxPeople : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    roomNumbers : [{ 
        number : Number,
        status : Boolean,
        unavailableDates : { type : [Date] } 
    }]
})

export default mongoose.model("Room", RoomSchema);