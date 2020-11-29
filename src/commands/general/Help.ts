import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import { Message } from "discord.js";

export default class Help extends Command {
    constructor() {
        super({
            aliases: ["halp"],
            category: "general",
            description: "Help Command",
            name: "help",
            permissions: ["SEND_MESSAGES"],
            usage: "help",
        });
    }
    async run(client: Client, message: Message, args: string[]) {

    }
}