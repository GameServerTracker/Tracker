# GameServerTracker-Tracker

<p align="center">A tracker to monitor the number of players connected to Minecraft / Source (Gmod, CS, CSGO) / FiveM servers</p>

## Description

This TypeScript script retrieves the number of players connected to a game server specified in the configuration file. The results are stored in a PostgreSQL database and displayed on a Grafana dashboard.

This API was inspired by the Lametric Clock app project : [GameServerTracker-LametricApp](https://github.com/BliTz037/GameServerTracker-LametricApp)

## Available Servers
- Minecraft Java Edition
- Source (All servers using the Source game engine like : Half-Life, Counter-Strike, Team Fortress 2, GMod, etc)
- FiveM / RedM (ONLY By Address)

## Installation

### Requires
- Docker & Docker-compose
- NodeJS
- A job scheduler like crontab (recommended)

### Setup

#### Clone project
```bash
$ git clone https://github.com/BliTz037/GameServerTracker-Tracker.git
$ cd GameServerTracker-Tracker/
```

#### Install script's dependencies
```bash
$ npm install
OR
$ yarn install
```

#### Setup .env

```bash
$ touch .env
```

The environement variable required

```env
POSTGRES_HOST=localhost
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=server

#LOGIN FOR GRAFANA
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=admin
```

#### Add server to tracker

- Open file `serverList.ts`

You will see a variable named : **serverList** with some examples
```TS
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
```

- Delete the content of array, and add your server

## Running

#### Running Grafana & Database

```bash
$ docker-compose up
```

#### Build the script
```bash
$ npx tsc
```

#### Running the script
```bash
$ node dist/src/index.js
```

#### Running the script with crontab
```bash
$ crontab -e
```
Add this line
```
# Every 10 minutes
*/10 * * * * node /your_path/GameServerTracker-Tracker/dist/src/index.js
```

## Credit

- Author - [BliTz_37 - A guy from Tek](https://github.com/BliTz037/)
