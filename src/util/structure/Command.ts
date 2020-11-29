import { Message } from "discord.js";
import BaseClient from "./Client";
import CommandData from "../Interfaces/Command";

export default abstract class Command {
    constructor(public CommandData: CommandData) { };
    abstract async run(client: BaseClient, message: Message, args: string[]): Promise<any>;
}