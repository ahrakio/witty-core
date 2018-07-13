import { Routes } from "./Routes";
import { Route } from "./Route";
import NoRoute from "./exceptions/NoRoute";

export namespace Router {

    let routes = new Routes();

    export function get(uri: string, target: string) {
        routes.get(uri, target);
    }

    export function post(uri: string, target: string) {
        routes.post(uri, target);
    }

    export function match(method: string, uri: string): Route | null {
        if (!routes.has(method, uri)) {
            throw new NoRoute();
        }

        return routes.match(method, uri);
    }
}

