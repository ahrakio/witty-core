import { Routes } from "./Routes";
import { Route } from "./Route";

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
            return null;
        }

        return routes.match(method, uri);
    }
}

