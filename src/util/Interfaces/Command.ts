import { PermissionResolvable } from "discord.js";

export default interface Command {
    aliases: string[];
    name: string;
    usage: string;
    category: string;
    description: string;
    permissions: PermissionResolvable[];
}