import { Message, MessageReaction, User as DUser } from "discord.js";
import Store from "../../database/models/user/store.type";
import BaseClient from "../../util/structure/Client";
import Command from "../../util/structure/Command";
import Worker from "../../database/models/user/worker.type";
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

        if (args[0]?.toLowerCase() === "worker") {

            const newWorker: Worker = {
                checkIn: Date.now(),
                sellMulti: 1,
                sellPrice: 3,
                specialty: "soda",
                workerId: "124",
                workerName: "John",
                output: 20
            }

            if (user.balance - 500 < 0) return message.channel.send("You can't buy a new worker.");
            else {

                user.store.workers.push(newWorker);

                user.balance -= 500;

                client.userCache.update(user);

                return message.channel.send(`You successfully bought a new worker.`);

            }


        }

        const stores: Store[] = [
            {
                cost: 1000, sellPrice: 1000, workers: [
                    {
                        checkIn: Date.now(),
                        sellMulti: 1,
                        sellPrice: 8,
                        specialty: "pizza",
                        workerId: "123",
                        workerName: "John",
                        output: 5
                    }
                ],
            },
        ];

        const emojis = ["1️⃣"];

        const m = await message.channel.send(`Which store would you like to buy?\n\n${stores.map((d, i) => `${emojis[i]} ${d.workers[0].specialty} - Costs $${d.cost} - Outputs: $${d.workers[0].sellPrice}`).join("\n")}`)

        emojis.forEach(e => m.react(e));

        const filter = (reaction: MessageReaction, user: DUser) => user.id === message.author.id && emojis.includes(reaction.emoji.name);

        const reacted = await m.awaitReactions(filter, { max: 1 });

        let storeToBuy: Store;

        switch (<"1️⃣" | "2️⃣">reacted.first().emoji.name) {
            case "1️⃣":
                storeToBuy = stores[0];
                break;
        }

        await m.reactions.removeAll();

        user.store = storeToBuy;

        if ((user.balance - storeToBuy.cost) < 0) return m.edit(`${message.author}, you need ${Math.abs(user.balance - storeToBuy.cost)} more dollars to buy that!`);
        user.balance = user.balance - storeToBuy.cost;

        try {
            await client.userCache.update(user);
        } catch (err) {
            return message.channel.send("Something went wrong");
        }

        return m.edit(`${message.author}, you successfully bought the ${storeToBuy.workers[0].specialty} store!`);
    }

    public async delete(client: BaseClient, message: Message,): Promise<void> {
        await client.userCache.delete(message.author.id);
        message.channel.send('Deleted you account!');
    }
}