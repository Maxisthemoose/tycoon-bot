import { model, Schema } from "mongoose";
import User from "../interfaces/User";

const User = new Schema({
    uId: { type: String, required: true },
});

export default model<User>("users", User);