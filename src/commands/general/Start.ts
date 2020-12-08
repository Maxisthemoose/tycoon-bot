import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import { Message } from "discord.js";

export default class Start extends Command {
    constructor() {
        super({
            aliases: ["s"],
            category: "general",
            description: "Start your journey.",
            name: "Start",
            permissions: ["SEND_MESSAGES"],
            usage: "start",
        });
    }

    public async run(client: Client, message: Message, args: string[]) {
        const user = client.userCache.get({ uId: message.author.id });
        if (user) return message.channel.send("You have already started! You can't start again");

        await client.userCache.create({
            uId: message.author.id,
        });

        message.channel.send('Started your Tycoon bot account.');
    }
}