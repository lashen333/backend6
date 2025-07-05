// src\models\UserEvent.ts
import mongoose from "mongoose";
import {UserEventType} from "../types/UserEvent.types";

const userEventSchema = new mongoose.Schema<UserEventType>(
  {
    userId: {type:String, required:true},
    event: {type:String, required:true},
    value: {type:Number, required:false},
    timestamp: {type:Number, default:Date.now},
  },
  {timestamps:true}
)



export const UserEvent = mongoose.model("UserEvent", userEventSchema);
