import { Route } from "../Route";

export class GetRoute extends Route {
    constructor(uri: string, target: string) {
        super(uri, target);
    }
}