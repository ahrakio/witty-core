import { Routes } from "./Routes";
import { Route } from "./Route";
import { NoRoute } from "./exceptions/NoRoute";
import { Method } from "./Constants";
import { RouteOptions } from "./RouteOptions";
import { RouteInstance } from "./RouteInstance";

export class Router {
    private static routes = new Routes();

    static get(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.GET, options);
    }

    static post(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.POST, options);
    }

    static put(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.PUT, options);
    }

    static delete(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.DELETE, options);
    }

    static trace(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.TRACE, options);
    }

    static connect(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.CONNECT, options);
    }

    static head(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.HEAD, options);
    }

    static option(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.OPTIONS, options);
    }

    static patch(uri: string, options: RouteOptions | string) {
        Router.add(uri, Method.PATCH, options);
    }

    private static add(uri: string, method: string, options: RouteOptions | string) {
        if (typeof options === "string") {
            Router.routes.addRoute(uri, method, {
                target: options
            });
        } else {
            Router.routes.addRoute(uri, method, options);
        }
    }

    static match(method: string, uri: string): RouteInstance {
        if (!Router.routes.has(method, uri)) {
            throw new NoRoute();
        }

        return Router.routes.match(method, uri);
    }
}
