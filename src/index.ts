import * as http from "http"
import { Router } from "./router/Router";
import Request from "./http/Request";
import { Route } from "./router/Route";
import RequestHandler from "./http/RequestHandler";
import Response from "./http/Response";

/**
 * These three lines will be written in the future
 * in the api.ts file, which will be our Routing file
 * for the programmer who wants to add routes of his own.
 */
Router.get('/users/5', 'UserController@update');
Router.post('/organizations/3/events', 'EventController@store');
Router.post('/businesses/1/sales/5/edit', 'SaleController@update');


/**
 * This is the server creation, this is NOT EXPOSED TO THE 
 * PROGRAMMER!
 */

let server = http.createServer((req, res) => {
    let route: Route;
    let uri = req.url as string;
    let method = req.method as string;
    let headers = req.headers as {[key: string]: string};

    let result = Router.match(method, uri);
    if (result === null) {
        res.write('No such route\n');
        res.write(req.method + ' ' + req.url);
        res.end();
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

    res.write(method + ' ' + uri);
    res.end();
});

server.listen(7777, () => {
    console.log('Listening...');
});

