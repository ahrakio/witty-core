import Headers from "./Headers";
import { Route } from "../router/Route";

export default class Request {
    private headers: Headers;
    private route: Route;

    constructor(headers: {[key: string]: string}, route: Route) {
        this.headers = this.parseHeaders(headers);
        this.route = route;
    }

    private parseHeaders(headers: {[key: string]: string}): Headers {
        let h = new Headers();
        
        for (let key of Object.keys(headers)) {
            h.set(key, headers[key]);
        }

        return h;
    }

    get Headers(): Headers {
        return this.headers;
    }

    get Route(): Route {
        return this.route;
    }

}