import {Request} from "./Request";
import { RouteInstance } from "@ahrakio/witty-router";
import * as net from "net";
import {AbstractRequest} from "./AbstractRequest";

export class SocketRequest extends AbstractRequest implements Request {
    constructor (route: RouteInstance, socket:net.Socket, private data:string) {
        super(route, socket);
    }

    get Data(): string {
        return this.data;
    }

}