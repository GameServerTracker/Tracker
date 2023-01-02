import { ServerType } from "./src/enum";

interface IServer {
    name: string,
    type: ServerType,
    address: string
};

const serverList: IServer[] = [
    {
        name: "PrisonRP",
        type: ServerType.Minecraft,
        address: "play.prisonroleplay.fr:27110"
    },
    {
        name: "Hephocraft",
        type: ServerType.Minecraft,
        address: "play.hepho.fr"
    },
    {
        name: "GarnetGaming.net DarkRP",
        address: "208.103.169.33:27015",
        type: ServerType.Source
    }
]

export default serverList;