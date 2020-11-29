import { ClientOptions, Collection } from "discord.js";

export default interface BaseClient {
    prefix: string;
    token: string;
    owners: string | string[];
    Base?: ClientOptions;
}