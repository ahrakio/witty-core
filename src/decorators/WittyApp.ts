import { Map } from "../utils/Map";
import { Controller } from "../http/controllers/Controller";
import { AppConfig } from "../App.config";
import { Middleware } from "../http/middlewares/Middleware";
import { NetworkAdapter } from "../adapters/NetworkAdapter";
// prettier-ignore
export function WittyApp<C extends Controller, M extends Middleware, A extends NetworkAdapter>(
    details: {
        controllers: { new (): C }[],
        middlewares: { new (): M }[],
        adapters: { new (): A }[],
    }
    ) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        let c = new Map<{ new (): Controller }>();
        let m = new Map<{ new (): Middleware }>();
        let a: NetworkAdapter[] = [];

        for (let controller of details.controllers) {
            c.add(controller.name, controller);
        }

        for (let middleware of details.middlewares) {
            m.add(middleware.name, middleware);
        }

        for (let adapter of details.adapters) {
            a.push(new adapter());
        }
        
        AppConfig.Controllers = c;
        AppConfig.Middlewares = m;
        AppConfig.Adapters = a;

        return class extends constructor {
            adapters = a;
            env = '.env';
        };
    };
}
