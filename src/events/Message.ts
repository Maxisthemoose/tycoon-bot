import BaseClient from "../util/structure/Client";
import Event from "../util/structure/Event";
import { Message as Msg } from "discord.js";

export default class Message extends Event {
    constructor() {
        super({
            event: "message",
            description: "Message event.",
        });
    }
    async run(client: BaseClient, message: Msg) {

        const args = message.content.slice(client.BaseClientData.prefix.length).trim().split(" ");
        const command = args.shift();

        const CommandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        if (CommandFile) return CommandFile.run(client, message, args);
    }
}