import { ClientEvents } from "discord.js";
import EventData from "../Interfaces/Event";
import BaseClient from "./Client";

export default abstract class Event {

    constructor(private EventData: EventData) { }

    public get event(): keyof ClientEvents { return this.EventData.event }
    public get description(): string { return this.EventData.description }

    abstract run(client: BaseClient, ...args: any): Promise<any>;
}