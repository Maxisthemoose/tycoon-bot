import Command from "../../util/structure/Command";
import Client from "../../util/structure/Client";
import { Message } from "discord.js";

export default class Name extends Command {
  constructor() {
    super({
      aliases: ["n", "rename"],
      category: "shop",
      description: "Set or rename your shop",
      name: "Name",
      permissions: ["SEND_MESSAGES"],
      usage: "name",
    });
  }

  public async run(client: Client, message: Message, args: string[]) {
    const hasShop: any = client.userCache.get({ uId: message.author.id });
    const name = args.join(" ");

    if (!hasShop)
      return message.channel.send(
        "You dont seem to have a shop open, use the `!start` command to get started!"
      );

    hasShop.name = name;
    await client.userCache.update(hasShop);
    message.channel.send(`Changed shop name to: \`${name}\``);
  }
}
