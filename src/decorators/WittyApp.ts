import * as http from 'http';
import { Route } from '../router/Route';
import {RequestHandler} from '../http/RequestHandler';
import {Request} from '../http/Request';
import {Response} from '../http/Response';
import { Router } from '../router/Router';
import { Map } from "../utils/Map";
import {Controller} from "../http/controllers/Controller";
import { AppConfig } from '../App.config';
import { Middleware } from '../http/middlewares/Middleware';
import { MiddlewareHandler } from '../http/middlewares/MiddlewareHandler';


export function WittyApp<C extends Controller, M extends Middleware>(details: {controllers: {new(): C}[], middlewares: {new(): M}[]}) {
    return <T extends {new(...args:any[]):{}}>(constructor:T) => {
        let c = new Map<{new(): Controller}>();
        let m = new Map<{new(): Middleware}>();

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
                let route: Route;
                let uri = req.url as string;
                let method = req.method as string;
                let headers = req.headers as {[key: string]: string};
            
                let result;
            
                try {
                    result = Router.match(method, uri);

                } catch (err) {
                    res.write('No such route\n');
                    res.write(req.method + ' ' + req.url);
                    res.end();
                    return;
                }
            
                route = result as Route;

                
                let request = new Request(headers, route);
                let response = new Response();

                let middlewareHandler = new MiddlewareHandler(request, response);
                if (!await middlewareHandler.handle()) {
                    res.write('didnt pass middleware');
                    res.end();
                    return;
                }
            
                let requestHandler = new RequestHandler(request, response);

                try {
                    requestHandler.handle()
                        .then((resolved: Response) => {
                            resolved.send(res);
                        })
                        .catch((rej) => {
                            console.log(rej);
                            res.write('rejected');
                            res.end();
                        });
                } catch (err) {
                    res.write(err);
                    res.end();
                }
            });
        }
    }
}