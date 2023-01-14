import serverList from "../serverList";
import { AppDataSource } from "./Database";
import { ServerData } from "./ServerData";
import { actionTrackDict } from "./track";

const main = async () => {
  const result: any[] = [];

  try {
    const connection = await AppDataSource.initialize();
    for (const element of serverList) {
      const tmp = await actionTrackDict[element.type](element.address);
      result.push(
        {
          name: element.name,
          address: element.address,
          type: element.type,
          playersOnline: tmp.playersOnline,
          playersMax: tmp.playersMax,
          timestamp: Date.now()
        }
      );
      const serverData: ServerData = new ServerData();
      serverData.name = element.name;
      serverData.address = element.address;
      serverData.type = element.type;
      serverData.playersOnline = tmp.playersOnline;
      serverData.playersMax = tmp.playersMax;
      await connection.manager.save(serverData);
    }
    console.log(`Track done for ${ServerData.name}`);
  } catch (error) {
    console.log(error)
  }
}
main();