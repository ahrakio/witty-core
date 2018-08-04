import {RouteTargetParser} from "./parsers/RouteTargetParser";
import {Map} from "../utils/Map";
import { RouteOptions } from "./RouteOptions";
export abstract class Route {
    private target: string; 
    private uri: string;
    private keys : string[];
    private params_map : Map<string>;
    private middlewares: string[];

    constructor(uri: string, target: string, options?: RouteOptions) {
        this.target = target;
        this.uri = uri;
        this.keys = [];
        this.params_map = new Map<string>();
        this.middlewares = [];

        if (options && options.middlewares) {
            this.middlewares = options.middlewares;
        }
    }
    get Uri () : string {
        return this.uri;
    }
    parseTarget(parser: RouteTargetParser): [string, string] {
        return parser.parse(this.target);
    }

    set ParamKeys (keys : string[]) {
        this.keys = keys;
    }
    get ParamKeys() : string[] {
        return this.keys;
    }

    public SetParamValues(values : string[]) {
        if (values.length !== this.ParamKeys.length) {
            console.log("ERROR: uri parameters count doesn't match to initialized regex parameter count");
            return;
        }
        for (let key =0 ; key < this.ParamKeys.length ; ++key) {
            this.params_map[this.ParamKeys[key]] = values[key];
        }
    }

    get Params() : Map<string> {
        return this.params_map;
    }

    get Target(): string {
        return this.target;
    }

    get Middlewares(): string[] {
        return this.middlewares;
    }

    set Middlewares(value: string[]) {
        this.middlewares = value;
    }

    public addMiddleware(value: string) {
        this.middlewares.push(value);
    }
}