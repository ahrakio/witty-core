import * as path from "path";
import { readJsonFile } from "../utils/FileSystem";

import { NetworkProtocol } from "./Constants";
import { HttpAdapter } from "./HttpAdapter";
import { TCPAdapter } from "./TCPAdapter";

export abstract class NetworkAdapter {
    protected server: any;
    protected port: number;
    protected protocol: string;
    protected name: string;

    constructor(name: string, port: number) {
        this.port = port;
        this.name = name;
        this.server = null;
    }

    public abstract listen();
    public abstract close();

    public get Protocol(): string {
        return this.protocol;
    }

    public get Name(): string {
        return this.name;
    }

    public static loadConfigurationFile(file_path: string): NetworkAdapter[] {
        let file = readJsonFile(path.resolve(file_path));

        if (file === null) {
            return [];
        }

        let adapters: NetworkAdapter[] = [];

        for (let connection of file.connections) {
            switch (connection.protocol) {
                case NetworkProtocol.HTTP:
                    adapters.push(new HttpAdapter(connection.name, connection.port));
                    break;
                case NetworkProtocol.TCP:
                    adapters.push(new TCPAdapter(connection.name, connection.port));
                    break;
                default:
                    continue;
            }
        }

        return adapters;
    }
}
