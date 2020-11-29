import readdir from "readdir-plus";
import BaseClient from "../structure/Client";
import BaseEvent from "../structure/Event";

export default function init(dir: string, client: BaseClient) {
    readdir(dir, async (err, files) => {
        if (err) throw err;
        for (const file of files) {

            const { default: Event } = await import(file.path);
            const NewEvent = <BaseEvent>new Event();

            client.on(NewEvent.event, NewEvent.run.bind(null, client));

            console.log(`Loaded: ${NewEvent.event} | Event`);

        }
    })
}