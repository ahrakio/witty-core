import { Router } from "./router/Router";

Router.get('/users/5', 'UserController@try');
Router.post('/organizations/3/events', 'EventController@store');
Router.post('/businesses/1/sales/5/edit', 'SaleController@update');



