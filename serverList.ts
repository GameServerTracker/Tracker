import { ServerType } from "./src/enum";

interface IServer {
    name: string,
    type: ServerType,
    address: string
};

const serverList: IServer[] = [
    {
        name: "Hypixel",
        type: ServerType.Minecraft,
        address: "mc.hypixel.net"
    },
    {
        name: "VLife",
        type: ServerType.Source,
        address: "192.168.1.237:27015"
    },
    {
        name: "GTA RP",
        type: ServerType.FiveM,
        address: "address.com"
    }
]

export default serverList;