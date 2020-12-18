import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import { Message, MessageEmbed } from "discord.js";

export default class Start extends Command {
    constructor() {
        super({
            aliases: ["found", "create"],
            category: "Shop",
            description: "Start your journey.",
            name: "Start",
            permissions: ["SEND_MESSAGES"],
            usage: "start",
        });
    }

    public async run(client: Client, message: Message, args: string[]) {
        const user = client.userCache.get({ uId: message.author.id });
        if (user) return message.channel.send("You already own a pizza shop");

        await client.userCache.create({
            uId: message.author.id,
        });

        message.channel.send('Your pizza shop has been started');

        try {
          message.author.send(`**🎉  Grand Opening!**\nI see you've opened a new shop, so here are some helpful tips. You can use the \`!name\` command to change the name of you shop and anytime. You pizza shop also makes passive income, using the \`!claim\` command you can collect all of your hard earned money. Try to use the \`!hire\` command to hire your first employee and boost how much your shop can make.`);
        } catch (err) {
          console.log(err);
        };
    };
};