import { Document } from "mongoose";
import Store from "./store.type";

export default interface User extends Document {
    uId: string;
    prestige?: number;
    balance?: number;
    stores?: Store[];
}