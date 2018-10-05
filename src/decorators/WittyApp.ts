import { ResponseSender } from "./../http/ResponseSender";
import * as http from "http";
import { RequestHandler } from "../http/RequestHandler";
import { Request } from "../http/Request";
import { Response } from "../http/Response";
import { Router } from "../router/Router";
import { Map } from "../utils/Map";
import { Controller } from "../http/controllers/Controller";
import { AppConfig } from "../App.config";
import { Middleware } from "../http/middlewares/Middleware";
import { MiddlewareHandler } from "../http/middlewares/MiddlewareHandler";
import { RouteInstance } from "../router/RouteInstance";
// prettier-ignore
export function WittyApp<C extends Controller, M extends Middleware>(details: {
    controllers: { new (): C }[],
    middlewares: { new (): M }[]
}) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        let c = new Map<{ new (): Controller }>();
        let m = new Map<{ new (): Middleware }>();

        for (let controller of details.controllers) {
            c.add(controller.name, controller);
        }

        for (let middleware of details.middlewares) {
            m.add(middleware.name, middleware);
        }

        AppConfig.Controllers = c;
        AppConfig.Middlewares = m;
        return class extends constructor {
            server = http.createServer(async (req, res) => {
                let route: RouteInstance;
                let uri = req.url as string;
                let method = req.method as string;

                let result;

                try {
                    result = Router.match(method, uri);
                } catch (err) {
                    res.write("No such route\n");
                    res.write(req.method + " " + req.url);
                    res.end();
                    return;
                }

                route = result as RouteInstance;

                let request = new Request(req, route);
                let response = new Response();

                let middlewareHandler = new MiddlewareHandler(request, response);

                try {
                    if (!(await middlewareHandler.handle())) {
                        res.write("didnt pass middleware");
                        res.end();
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
                            (new ResponseSender(resolved, res)).send();
                        })
                        .catch((rej) => {
                            res.write("rejected");
                            res.end();
                        });
                } catch (err) {
                    res.write(err);
                    res.end();
                }
            });
        };
    };
}
