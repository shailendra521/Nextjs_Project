import mongoose, { Schema , Document } from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    messages:Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password must be at least 8 characters long"],
    },
    verifyCode:{
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required: [true, "Verify code expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    messages:[MessageSchema],
})

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
