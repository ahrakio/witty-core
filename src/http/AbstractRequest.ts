import {Socket} from "net";
import { RouteInstance, RouteTargetParser } from "@ahrakio/witty-router";

export abstract class AbstractRequest {
    constructor (protected route: RouteInstance, protected socket:Socket){}
    get port() :number {
        if (this.socket.remotePort===undefined) {
            return 0;
        }
        return this.socket.remotePort;
    }

    get address() :string {
        return this.socket.remoteAddress ? this.socket.remoteAddress : '';
    }

    get addressType() :string {
        return this.socket.remoteFamily ?  this.socket.remoteFamily  : '';
    }

    get target() : string {
        return this.route.Target;
    }

    parseTarget(parser: RouteTargetParser) {
        return this.route.parseTarget(parser);
    }

    get Middlewares(): string[] {
        return this.route.Middlewares;
    }

}