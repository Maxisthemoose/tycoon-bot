import { model, Schema } from "mongoose";
import User from "./user.type";

const User = new Schema({
  uId: { type: String, required: true },

  prestige: { type: Number, required: false, default: 0 },
  balance: { type: Number, required: false, default: 0 },
  // stores: { type: Array, required: false, default: [] },
  name: { type: String, required: false, default: 'New Shop' },
  inventory: {
    type: Object,
    required: false,
    default: {
      chefs: 0,
      waiters: 0,
    },
  },
  workers: { type: Array, required: false, default: [] },
});

export default model<User>("users", User);
