import serverList from "../serverList";
import { actionTrackDict } from "./track";

const main = async () => {
    console.log("Game Server Tracker - Tracker is started !");

    const result: any[] = [];
    for (const element of serverList) {
        const tmp = await actionTrackDict[element.type](element.address);
        result.push({ timestamp: Date.now(), players: tmp })
    }
    console.log(result);
}

main();