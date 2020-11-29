import { connect } from "mongoose";

connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("Logged into Database | Database");
});