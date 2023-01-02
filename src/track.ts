import { ping } from 'minecraft-server-ping';
import { IMinecraftData } from 'minecraft-server-ping/dist/interfaces';
import axios, { AxiosResponse } from 'axios';
import { ServerType } from './enum';
import { Server } from '@fabricio-191/valve-server-query';

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
    const hostname: string = addressSplited[0];
    const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 27015;

    try {
        if (port < 0 || port > 65536 || isNaN(port))
            throw (`Address ${address} has a bad port!`);
        const server: Server = await Server({ ip: hostname, port, timeout: 3000 });
        const data: any = await server.getInfo();
        return `${data.players.online || 0} / ${data.players.max || 0}`;
    } catch (err: any) {
        console.error(err);
        return "Offline";
    }
}

const trackFiveMServer = async (address: string): Promise<string> => {
    try {
        const response: AxiosResponse = await axios.get(`http://${address}/dynamic.json`, { timeout: 2000 });
        return `${response.data.clients} / ${response.data.sv_maxclients}`;
    } catch (err: any) {
        return "Offline"
    }
}

const actionTrackDict: { [id in ServerType]: (address: string) => Promise<string> } =
{
    Minecraft: trackMinecraftServer,
    Source: trackSourceServer,
    FiveM: trackFiveMServer
};

export {
    actionTrackDict
}
