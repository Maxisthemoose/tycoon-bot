import { Message, MessageEmbed } from "discord.js";

export class MainEmbed extends MessageEmbed {
    constructor(public message?: Message) {
        super();
        message && this._init();
    }

    public setMessage(message: Message): MainEmbed {
        this.message = message;
        this._init();
        return this;
    }

    private _init(): void {
        this
            .setAuthor(this.message.author.username, this.message.author.avatarURL())
            .setColor('FFDC15')
            .setTimestamp();
    }


}