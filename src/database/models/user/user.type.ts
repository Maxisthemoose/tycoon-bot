import { Document } from "mongoose";
import Store from "./Store";

export default interface User extends Document {
    uId: string;
    prestige?: number;
    balance?: number;
    stores?: Store[];
}