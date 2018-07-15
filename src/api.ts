import { Router } from "./router/Router";

Router.get('/users/:id', 'UserController@try');
Router.get('/organizations/:id/events', 'UserController@try');
Router.get('/businesses/:business_id/sales/:sale_id/edit', 'UserController@try');
Router.get('/businesses/:business_id/sales/:sale_id/edit', 'UserController@try');
Router.get('/users/id', 'UserController@try');
Router.get('/events.:ending.il', 'UserController@try');



