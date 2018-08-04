import { Route } from "../Route";
import { Method } from "../Constants";
import { GetRoute } from "./GetRoute";
import { PostRoute } from "./PostRoute";
import { RouteOptions } from '../RouteOptions';

export class RouteBuilder {
    private method:string;
    constructor(method:string) {
        this.method = method;
    }

    make (uri:string, options: RouteOptions) : Route {
        switch (this.method) {
            case Method.GET :
                return new GetRoute(uri, options.target, options);
                break;
            case Method.POST :
                return new PostRoute(uri, options.target, options);
                break;
            default:
                return new GetRoute(uri, options.target, options);
            /// TODo Throwing exception?
        }
        /// TODo Throwing exception?
    }
}