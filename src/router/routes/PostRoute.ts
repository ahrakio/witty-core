import { Route } from "../Route";
import { RouteOptions } from '../RouteOptions';

export class PostRoute extends Route {
    constructor(uri: string, target: string, options?: RouteOptions) {
        super(uri, target, options);
    }
}