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
    constructor() {}

    public bootstrap() {
        this.server.listen(8080, () => {
            console.log('Listening...');
        });
    }
}