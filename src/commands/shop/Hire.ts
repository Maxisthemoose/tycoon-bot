import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import { Message, MessageEmbed } from "discord.js";

export default class Hire extends Command {
    constructor() {
        super({
            aliases: ["h", "employee"],
            category: "shop",
            description: "View all employees for hire",
            name: "hire",
            permissions: ["SEND_MESSAGES"],
            usage: "hire",
        });
    }
    async run(client: Client, message: Message, args: string[]) {
      const data: any = client.userCache.get({ uId: message.author.id });
      const cooks = data.inventory.cooks || 0;
      const waiters = data.inventory.waiters || 0

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**Hire employees with** `!hire [employee]`')
        .addField('Avaliable employees', `🧑‍🍳 \`Cook\` - You have hired ${cooks} cook${cooks > 1 ? 's' : 's'} | ⌬ 3,500\n🤵 \`Server\` - You have hired ${waiters} server${waiters > 1 ? 's' : ''} | ⌬ 2,000  `)
        // .setDescription(`🧑‍🍳 \`Chef\` ─ ⌬ 3,500 ${cooks >= 1 ? `─ ${cooks} hired` : ''}\n\n🤵 \`Waiter\` ─ ⌬ 3,500  `);
          
      message.channel.send(embed);

    }
}