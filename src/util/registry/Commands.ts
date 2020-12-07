import BaseClient from "../structure/Client";
import readdir from "readdir-plus";
import Command from "../structure/Command";

export default function init(dir: string, subDirs: string[], client: BaseClient) {
    for (const subDir of subDirs) {
        readdir(`${dir}/${subDir}`, async (err, files) => {
            if (err) throw err;

            for (const file of files) {
                const { default: CommandFile } = await import(file.path);

                const command: Command = new CommandFile();

                client.commands.set(command.CommandData.name.toLowerCase(), command);

                for (const alias of command.CommandData.aliases) {
                    client.aliases.set(alias, command.CommandData.name.toLowerCase());
                }

            }

            console.log(`Loaded ${subDir} | ${client.commands.filter(c => c.CommandData.category === subDir).size} Commands`)

        });
    }
}