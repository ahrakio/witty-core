import { NetworkAdapter } from "./NetworkAdapter";
import { ResponseSender } from "./../http/ResponseSender";
import * as http from "http";
import { RequestHandler } from "../http/RequestHandler";
import { HTTPRequest } from "../http/HTTPRequest";
import { Response } from "../http/Response";
import { RouteInstance } from "@ahrakio/witty-router";
import { MiddlewareHandler } from "../http/middlewares/MiddlewareHandler";
import { NetworkProtocol } from "./Constants";
import { Router } from "@ahrakio/witty-router";

export class HttpAdapter extends NetworkAdapter {
    constructor(name: string, port: number) {
        super(name, port);
        this.protocol = NetworkProtocol.HTTP;
    }

    listen() {
        this.server = http
            .createServer(async (req, res) => {

                let route: RouteInstance;
                let uri = req.url as string;
                let method = req.method as string;
                console.log(`httpAdapter: gets request to ${uri} at method ${method}`);

                let result;

                try {
                    result = Router.match(method, uri);
                } catch (err) {
                    console.log("No such route\n");
                    res.write("No such route\n");
                    res.write(req.method + " " + req.url);
                    res.end();
                    return;
                }

                route = result as RouteInstance;
                console.log(`match with route ${route.Target}`);

                let request = new HTTPRequest(req, route);
                let response = new Response();
                console.log(`crate HTTPRequest for ${request.Method}`);
                let middlewareHandler = new MiddlewareHandler(request, response);

                console.log(`try to handle middlewares`);
                try {
                    if (!(await middlewareHandler.handle())) {
                        console.log("didn't pass middleware");
                        res.write("didn't pass middleware");
                        res.end();
                        return;
                    }
                } catch (e) {
                    console.log(`error: ${e}`);
                }
                console.log(`middleware passed`);
                let requestHandler = new RequestHandler(request, response);
                console.log(`try to handle request`);
                try {
                    requestHandler
                        .handle()
                        .then((resolved: Response) => {
                            console.log(`finish deal with request with : ${resolved.Data}`);
                            new ResponseSender(resolved, res).send();
                        })
                        .catch((rej) => {
                            res.write("rejected");
                            res.end();
                        });
                } catch (err) {
                    res.write(err);
                    res.end();
                }
            })
            .listen(this.port, () => {});
    }
    close() {
        throw new Error("Method not implemented.");
    }
}
