import { Route } from "../Route";
import { RouteOptions } from '../RouteOptions';

export class GetRoute extends Route {
    constructor(uri: string, target: string, options?: RouteOptions) {
        super(uri, target, options);
    }
}