import { ping } from 'minecraft-server-ping';
import { IMinecraftData } from 'minecraft-server-ping/dist/interfaces';
import query from 'source-server-query';
import axios, { AxiosResponse } from 'axios';


const trackMinecraftServer = async (address: string): Promise<string> => {
    const addressSplited: string[] = address.split(':');
    const hostname = addressSplited[0];
    const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 25565;
    const optionPing: any = { timeout: 2000 }

    try {
        if (port < 0 || port > 65536 || isNaN(port))
            throw (`Address ${address} has a bad port !`);
        const data: IMinecraftData = await ping(hostname, port, optionPing);
        return `${data.players.online || 0} / ${data.players.max || 0}`;
    } catch (err: any) {
        return "Offline"
    }
}

const trackSourceServer = async (address: string): Promise<string> => {
    const addressSplited: string[] = address.split(':');
    const hostname = addressSplited[0];
    const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 27015;

    try {
        if (port < 0 || port > 65536 || isNaN(port))
            throw (`Address ${address} has a bad port!`);
        const data: any = await query.info(hostname, port, 2000);
        return `${data.players || 0} / ${data.max_players || 0}`;
    } catch (err: any) {
        return "Offline"
    }
}

const trackFiveMServer = async (address: string): Promise < string > => {
    try {
        const response: AxiosResponse = await axios.get(`http://${address}/dynamic.json`, { timeout: 2000 });
        return `${response.data.clients} / ${response.data.sv_maxclients}`;
    } catch(err: any) {
        return "Offline"
    }
}

export {
    trackMinecraftServer,
    trackSourceServer,
    trackFiveMServer
}
