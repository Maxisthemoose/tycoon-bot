import { Document } from "mongoose";

export default interface User extends Document {
    uId: string;
}