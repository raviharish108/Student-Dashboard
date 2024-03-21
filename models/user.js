import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
    },
    cata: {
        type:String,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/01/18/21/49/singapore-1990959_960_720.jpg"
    }
},
{
    timestamps: true
})
export default mongoose.model("users",userSchema)