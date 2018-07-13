import { Map } from "../utils/Map";
import { Method } from "./Constants";
import { Route } from "./Route";
import { GetRoute } from "./routes/GetRoute";
import { PostRoute } from "./routes/PostRoute";

export class Routes {
    private routes: Map<Map<Route>>;

    constructor() {
        this.routes = new Map<Map<Route>>();

        this.routes.add(Method.GET, new Map<Route>());
        this.routes.add(Method.POST, new Map<Route>());
        this.routes.add(Method.PUT, new Map<Route>());
        this.routes.add(Method.DELETE, new Map<Route>());
    }

    public get(uri: string, target: string) {
        let map = this.routes
            .get(Method.GET)
            .add(uri, new GetRoute(uri, target));
    }

    public post(uri: string, target: string) {
        let map = this.routes
            .get(Method.POST)
            .add(uri, new PostRoute(uri, target));
    }

    public has(method: string, uri: string): boolean {
        return this.routes.has(method) && this.routes.get(method).has(uri);
    }

    public match(method: string, uri: string): Route | null {
        if (!this.has(method, uri)) {
            return null;
        }

        return this.routes
            .get(method)
            .get(uri);
    }

}


