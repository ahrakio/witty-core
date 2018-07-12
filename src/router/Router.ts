import { Routes } from "./Routes";

export namespace Router {

    let routes = new Routes();

    export function get(uri: string, target: string) {
        routes.get(uri, target);
    }

    export function post(uri: string, target: string) {
        routes.post(uri, target);
    }

    export function exec(method: string, uri: string): boolean {
        return routes.has(method, uri);
    }
}

