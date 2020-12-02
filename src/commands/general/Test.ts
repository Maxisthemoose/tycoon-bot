import { Message, MessageReaction, User as DUser } from "discord.js";
import Store from "../../database/interfaces/Store";
import User from "../../database/models/User";
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

        let user = await User.findOne({ uId: message.author.id });
        if (!user) user = await User.create({ uId: message.author.id });

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
            await user.updateOne(user);
        } catch (err) {
            return message.channel.send("Something went wrong");
        }

        return m.edit(`${message.author}, you successfully bought the ${storeToBuy.type} store!`);

    }
}