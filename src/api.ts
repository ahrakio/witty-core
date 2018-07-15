import { Router } from "./router/Router";

Router.get('/users/:id', 'UserController@try');
Router.get('/organizations/:id/events', 'EventController@store');
Router.post('/businesses/1/sales/5/edit', 'SaleController@update');



