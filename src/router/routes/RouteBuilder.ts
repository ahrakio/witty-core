import { Route } from "../Route";
import { Method } from "../Constants";
import { GetRoute } from "./GetRoute";
import { PostRoute } from "./PostRoute";

export class RouteBuilder {
    private method:string;
    constructor(method:string) {
        this.method = method;
    }

    make (uri:string, target:string) : Route {
        switch (this.method) {
            case Method.GET :
                return new GetRoute(uri, target);
                break;
            case Method.POST :
                return new PostRoute(uri, target);
                break;
            default:
                return new GetRoute(uri, target);
            /// TODo Throwing exception?
        }
        return new GetRoute(uri, target);
        /// TODo Throwing exception?
    }
}