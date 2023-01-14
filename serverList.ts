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
    }
]

export default serverList;