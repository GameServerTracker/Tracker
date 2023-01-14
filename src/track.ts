import { ping } from 'minecraft-server-ping';
import { IMinecraftData } from 'minecraft-server-ping/dist/interfaces';
import axios, { AxiosResponse } from 'axios';
import { ServerType } from './enum';
import { Server } from '@fabricio-191/valve-server-query';

const trackMinecraftServer = async (address: string): Promise<any> => {
    const addressSplited: string[] = address.split(':');
    const hostname = addressSplited[0];
    const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 25565;
    const optionPing: any = { timeout: 2000 }

    try {
        if (port < 0 || port > 65536 || isNaN(port))
            throw (`Address ${address} has a bad port !`);
        const data: IMinecraftData = await ping(hostname, port, optionPing);
        return {
            playersOnline: data.players.online || 0,
            playersMax: data.players.max || 0
        }
    } catch (err: any) {
        return {
            playersOnline: null,
            playersMax: null
        }
    }
}

const trackSourceServer = async (address: string): Promise<any> => {
    const addressSplited: string[] = address.split(':');
    const hostname: string = addressSplited[0];
    const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 27015;

    try {
        if (port < 0 || port > 65536 || isNaN(port))
            throw (`Address ${address} has a bad port!`);
        const server: Server = await Server({ ip: hostname, port, timeout: 3000 });
        const data: any = await server.getInfo();
        return {
            playersOnline: data.players.online || 0,
            playersMax: data.players.max || 0
        };
    } catch (err: any) {
        console.error(err);
        return {
            playersOnline: null,
            playersMax: null
        }
    }
}

const trackFiveMServer = async (address: string): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.get(`http://${address}/dynamic.json`, { timeout: 2000 });
        return {
            playersOnline: response.data.clients,
            playersMax: response.data.sv_maxclients
        }
    } catch (err: any) {
        return {
            playersOnline: null,
            playersMax: null
        }
    }
}

const actionTrackDict: { [id in ServerType]: (address: string) => Promise<any> } =
{
    Minecraft: trackMinecraftServer,
    Source: trackSourceServer,
    FiveM: trackFiveMServer
};

export {
    actionTrackDict
}
