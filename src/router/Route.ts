import RouteTargetParser from "./parsers/RouteTargetParser";

export abstract class Route {
    private target: string; 
    private uri: string;

    constructor(uri: string, target: string) {
        this.target = target;
        this.uri = uri;
    }
    get_uri () : string {
        return this.uri;
    }
    parseTarget(parser: RouteTargetParser): [string, string] {
        return parser.parse(this.target);
    }

    get Target(): string {
        return this.target;
    }
}