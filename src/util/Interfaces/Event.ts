import { ClientEvents } from "discord.js";

export default interface EventData {
    event: keyof ClientEvents;
    description?: string;
}