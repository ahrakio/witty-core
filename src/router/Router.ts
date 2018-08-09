import { Routes } from "./Routes";
import { Route } from "./Route";
import {NoRoute} from "./exceptions/NoRoute";
import { Method } from './Constants';
import { RouteOptions } from './RouteOptions';

export class Router {

    private static routes = new Routes();

    static get(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.GET, options);
    }

    static post(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.POST, options);
    }

    private static add(uri: string, method: string, options: RouteOptions | string) {
        if (typeof options === 'string') {
            Router.routes.addRoute(uri, method, {
                target: options
            });
        } else {
            Router.routes.addRoute(uri, method, options);
        }
    }

    static match(method: string, uri: string): Route  {
        if (!Router.routes.has(method, uri)) {
            throw new NoRoute();
        }

        return Router.routes.match(method, uri);
    }
}

