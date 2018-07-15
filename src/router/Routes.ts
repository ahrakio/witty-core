import { Map } from "../Map";
import { Method } from "./Constants";

import {MethodMapper} from "./MethodMapper";

export class Routes {
    private routes: Map<MethodMapper>;

    constructor() {
        this.routes = new Map<MethodMapper>();

        Object.keys(Method).forEach(method => {
            this.routes.add(Method[method], new MethodMapper(Method[method]));
        });
    }

    public get(uri: string, target: string) {
        this.routes
            .get(Method.GET)
                .add(uri, target);
        console.log("get uri resize to "+ this.routes.get(Method.GET).length());
    }

    public post(uri: string, target: string) {
        this.routes
            .get(Method.POST)
                .add(uri, target);
        console.log("post uri resize to "+ this.routes.get(Method.POST).length());
    }

    public has(method: string, uri: string): boolean {
        return this.routes.has(method) && this.routes.get(method).has(uri);
    }

    public exec(method: string, uri: string) {

    }

}


