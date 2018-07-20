import { Routes } from "./Routes";
import { Route } from "./Route";
import {NoRoute} from "./exceptions/NoRoute";

export class Router {

    private static routes = new Routes();

    static get(uri: string, target: string) {
        Router.routes.get(uri, target);
    }

    static post(uri: string, target: string) {
        Router.routes.post(uri, target);
    }

    static match(method: string, uri: string): Route  {
        if (!Router.routes.has(method, uri)) {
            throw new NoRoute();
        }

        return Router.routes.match(method, uri);
    }
}

