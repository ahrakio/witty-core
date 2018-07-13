import { Map } from "../utils/Map";
import Controller from "../http/controllers/Controller";

export function WittyApp(details: {controllers: {new(): Controller}[]}) {
    return <T extends {new(...args:any[]):{}}>(constructor:T) => {
        let c = new Map<Controller>();

        for (let controller of details.controllers) {
            let controllerInstance = new controller();
            c.add(controller.name, controllerInstance);
        } 

        return class extends constructor {
            controllers = c;
        }
    }
}