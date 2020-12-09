import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import { Message } from "discord.js";

export default class Help extends Command {
    constructor() {
        super({
            aliases: ["check"],
            category: "general",
            description: "Check in on your stores progress",
            name: "checkin",
            permissions: ["SEND_MESSAGES"],
            usage: "checkin",
        });
    }
    async run(client: Client, message: Message, args: string[]) {

        const user = client.userCache.get({ uId: message.author.id });
        if (!user) return message.channel.send("You haven't started an account yet!");

        const one_minute = 1000 * 60;



        let total_made = 0;

        for (const store of user.stores) {

            if (one_minute - (Date.now() - store.lastCheckIn) < 0) {

                const store_items_per_min = store.output;
                const time_passed_min = Math.floor(Math.abs(Date.now() - store.lastCheckIn) / 1000 / 60);

                const total_store_items = time_passed_min * store_items_per_min;

                user.balance += total_store_items * store.itemSellPrice;
                total_made += total_store_items * store.itemSellPrice;

                store.lastCheckIn = Date.now();
            }
        }


        if (total_made === 0) return message.channel.send("Your chefs didn't have enough time to make anything, come back later!");

        client.userCache.update(user);

        return message.channel.send(`You were away for [time here], and made $${total_made}!`);

    }
}