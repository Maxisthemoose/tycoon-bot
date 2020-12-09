import { Document } from "mongoose";
import Store from "./store.type";

export default interface User extends Document {
    /**
     * The users unique identifier
     */
    uId: string;
    /**
     * The prestige level they are at, default of 0
     */
    prestige?: number;
    /**
     * The current amount of money the user has
     */
    balance?: number;
    /**
     * An array of all the stores the user owns and is operating
     */
    stores?: Store[];
}
