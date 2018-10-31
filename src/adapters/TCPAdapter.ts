import { NetworkAdapter } from "./NetworkAdapter";
import { NetworkProtocol } from "./Constants";

import {Response} from "../http/Response";
import {HTTPRequest} from "../http/HTTPRequest";
import {RequestHandler} from "../http/RequestHandler";
import {MiddlewareHandler} from "../http/middlewares/MiddlewareHandler";
import {ResponseSender} from "../http/ResponseSender";
import * as net from "net";
import { RouteInstance } from "@ahrakio/witty-router";
import { Router } from "@ahrakio/witty-router";
import {SocketRequest} from "../http/SocketRequest";



export class TCPAdapter extends NetworkAdapter {
    constructor(name: string, port: number) {
        super(name, port);
        this.protocol = NetworkProtocol.TCP;
    }

    private fin_with_err(socket, err) {
        socket.write(err);
        socket.end();
    };

    listen()
    {
        this.server = net
            .createServer( async (socket) => {
                let route: RouteInstance;
                let promised_data = new Promise<string>((resolve, reject) => {
                    let data:string = '';
                    socket.on('data', (buff)=>{
                        data+= buff.toString();
                    });
                    socket.on('end', ()=> {
                        resolve(data);
                    });
                    socket.on('error', (err)=>{
                        reject(err);
                    });
                });

                let result;

                try {
                    promised_data.then(async data=> {
                        result = Router.match(data, ''); // TODO edit to new match
                        route = result as RouteInstance;

                        let request = new SocketRequest(route, socket, data);
                        let response = new Response();

                        let middlewareHandler = new MiddlewareHandler(request, response);

                        try {
                            if (!(await middlewareHandler.handle())) {
                                socket.write("didnt pass middleware");
                                socket.end();
                                return;
                            }
                        } catch (e) {
                            console.log(e);
                        }

                        let requestHandler = new RequestHandler(request, response);

                        try {
                            requestHandler
                                .handle()
                                .then((resolved: Response) => {
                                    new ResponseSender(resolved, socket).send();
                                })
                                .catch((rej) => {
                                    socket.write("rejected");
                                    socket.end();
                                });
                        } catch (err) {
                            socket.write(err);
                            socket.end();
                        }
                    });
                    promised_data.catch(err=> this.fin_with_err(socket,err));

                } catch (err) {
                    this.fin_with_err(socket,err);
                    return;
                }


            })
            .listen(this.port, () => {});

    }
    close() {
        throw new Error("Method not implemented.");
    }
}
