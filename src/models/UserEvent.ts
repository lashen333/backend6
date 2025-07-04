// src\models\UserEvent.ts
import mongoose from "mongoose";
import {UserEventType} from "../types/UserEvent.types";

const userEventSchema = new mongoose.Schema<UserEventType>(
  {
    ip: {type:String, required:true},
    event: {type:String, required:true},
    value: {type:Number, required:false},
    timestamp: {type:Date, default:Date.now},
  },
  {timestamps:true}
)



export const UserEvent = mongoose.model("UserEvent", userEventSchema);
