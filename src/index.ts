import * as http from "http"
import { Router } from "./router/Router";

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
    let result = Router.exec(req.method as string, req.url as string);

    if (!result) {
        res.write('No such route\n');
        res.write(req.method + ' ' + req.url);
        res.end();
    } else {
        res.write(req.method + ' ' + req.url);
        res.end();
    }    
});

server.listen(7777, () => {
    console.log('Listening...');
});

