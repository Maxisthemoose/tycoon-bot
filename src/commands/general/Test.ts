import { Message, MessageReaction, User as DUser } from "discord.js";
import Store from "../../database/models/user/store.type";
import { MainEmbed } from "../../embeds/MainEmbed";
import BaseClient from "../../util/structure/Client";
import Command from "../../util/structure/Command";

export default class Test extends Command {
    constructor() {
        super({
            aliases: [],
            category: "general",
            description: "Test",
            name: "test",
            permissions: [],
            usage: "test",
        });
    }
    async run(client: BaseClient, message: Message, args: string[]) {

        let user = client.userCache.get({ uId: message.author.id });
        if (!user) return message.channel.send(`Please use ${client.BaseClientData.prefix}${client.commands.get('start').CommandData.usage}`)

        if (args[0]?.toLowerCase() === 'delete') return this.delete(client, message);
        if (args[0]?.toLowerCase() === 'embed') return this.embed(message);

        const stores: Store[] = [
            { cost: 1000, output: 100, type: "pizza" },
            { cost: 500, output: 50, type: "drinks" },
        ];

        const emojis = ["1️⃣", "2️⃣"];

        const m = await message.channel.send(`Which store would you like to buy?\n\n${stores.map((d, i) => `${emojis[i]} ${d.type} - Costs $${d.cost} - Outputs: $${d.output}`).join("\n")}`)

        emojis.forEach(e => m.react(e));

        const filter = (reaction: MessageReaction, user: DUser) => user.id === message.author.id && emojis.includes(reaction.emoji.name);

        const reacted = await m.awaitReactions(filter, { max: 1 });

        let storeToBuy: Store;

        switch (<"1️⃣" | "2️⃣">reacted.first().emoji.name) {
            case "1️⃣":
                storeToBuy = stores[0];
                break;
            case "2️⃣":
                storeToBuy = stores[1];
                break;
        }

        await m.reactions.removeAll();

        user.stores.push(storeToBuy);

        if ((user.balance - storeToBuy.cost) < 0) return m.edit(`${message.author}, you need ${Math.abs(user.balance - storeToBuy.cost)} more dollars to buy that!`);
        user.balance = user.balance - storeToBuy.cost;

        try {
            await client.userCache.update(user);
        } catch (err) {
            return message.channel.send("Something went wrong");
        }

        return m.edit(`${message.author}, you successfully bought the ${storeToBuy.type} store!`);
    }

    public async delete(client: BaseClient, message: Message,): Promise<void> {
        await client.userCache.delete(message.author.id);
        message.channel.send('Deleted you account!');
    }

    public embed(message: Message) {
        const e = new MainEmbed()
            .setMessage(message)
            .setTitle('Test')
            .setDescription('Test')
            .addField('Test', 'Test');

        message.channel.send(e);
    }
}