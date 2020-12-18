import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import Worker from "../../database/models/user/worker.type";
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
    // DATA STUFF
    const data: any = client.userCache.get({ uId: message.author.id });
    const managers = data.workers.filter((k: Worker) => k.type === "manager").length;
    const hchefs = data.workers.filter((k: Worker) => k.type === "head chef").length;
    const schefs = data.workers.filter((k: Worker) => k.type === "schefs").length;
    const cooks = data.workers.filter((k: Worker) => k.type === "cook").length;
    const servers = data.workers.filter((k: Worker) => k.type === "server").length;
    const bussers = data.workers.filter((k: Worker) => k.type === "busser").length;

    // const embed = new MessageEmbed()
    //   .setColor('RANDOM')
    //   .setDescription('**Hire employees with** `!hire [employee]`')
    //   .addField('Avaliable employees', `🧑‍🍳 \`Cook\` - You have hired ${cooks} cook${cooks > 1 ? 's' : 's'} | ⌬ 3,500\n🤵 \`Server\` - You have hired ${waiters} server${waiters > 1 ? 's' : ''} | ⌬ 2,000  `)
    // .setDescription(`🧑‍🍳 \`Chef\` ─ ⌬ 3,500 ${cooks >= 1 ? `─ ${cooks} hired` : ''}\n\n🤵 \`Waiter\` ─ ⌬ 3,500  `);

    // if (!args[0]) return message.channel.send(embed);

    let hired: Worker;
    // TYPES OF WORKERS
    const workers: Worker[] = [
      { type: "manager", level: "1", output: "72" },
      { type: "head chef", level: "1", output: "56" },
      { type: "sous chef", level: "1", output: "43" },
      { type: "cook", level: "1", output: "30" },
      { type: "server", level: "1", output: "25" },
      { type: "busser", level: "1", output: "17" },
    ];

    switch (args[0]) {
      case "manager":
        if (managers > 2) return message.channel.send("Your pizza shop does not need another manager!");
        hired = workers[3];
        data.workers.push(hired);
        await client.userCache.update(data);
        break;
    }
  }
}
