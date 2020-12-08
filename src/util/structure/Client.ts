import { Client, Collection, Intents } from "discord.js";
import BaseClientData from "../Interfaces/Client";
import "dotenv/config";
import Command from "./Command";
import initC from "../registry/Commands";
import initE from "../registry/Events";
import { UserCache } from "../../cache/user";

export default class BaseClient extends Client {

    public userCache = new UserCache();
    commands = new Collection<string, Command>();
    aliases = new Collection<string, string>();

    constructor(public BaseClientData: BaseClientData) {
        super(BaseClientData.Base);
    }

    public async start() {
        await import("../../database/database");
        initC("./src/commands", ["general"], this);
        initE("./src/events", this);
        this.login(this.BaseClientData.token);
    }

}

export const config: BaseClientData = {
    prefix: "!",
    token: process.env.TOKEN,
    owners: [
        "408080307603111936",
        "481158632008974337",
        "488143607602085908"
    ],
    Base: {
        ws: {
            intents: Intents.ALL
        },
        restTimeOffset: 40
    }
}