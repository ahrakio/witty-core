import * as http from 'http';
import { Route } from './router/Route';
import RequestHandler from './http/RequestHandler';
import Request from './http/Request';
import Response from './http/Response';
import { Router } from './router/Router';
import UserController from './http/controllers/UserController';
import { WittyApp } from './decorators/WittyApp';
import Controller from './http/controllers/Controller';
import { Map } from './utils/Map';
import EventController from './http/controllers/EventController';


@WittyApp({
    controllers: [
        UserController,
        EventController
    ]
})
export default class App {
    private server: any;
    private controllers: Map<Controller>[];

    constructor() {
        this.server = http.createServer((req, res) => {
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
            let response = new Response(res);
        
            let requestHandler = new RequestHandler(request, response);
            requestHandler.handle()
                .then((res) => {
                    
                },
                (rej) => {
                    
                });
        });
    }

    public bootstrap() {
        this.server.listen(7777, () => {
            console.log('Listening...');
        });
    }
}