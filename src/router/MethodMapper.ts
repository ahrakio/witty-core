import { Map } from "../utils/Map";
import {parse} from "url"
import { Route } from "./Route";
import {NoRoute} from "./exceptions/NoRoute";

import {RouteBuilder} from "./routes/RouteBuilder";
import {RouteConflict} from "../http/exceptions/RouteConflict";
import { RouteOptions } from './RouteOptions';

export class MethodMapper {
    private fixed_uri : Map<Route>;
    private regex_uri : Array<Route>;
    private route_builder : RouteBuilder;

    constructor(method:string){
        this.fixed_uri = new Map<Route>();
        this.regex_uri = [];
        this.route_builder = new RouteBuilder(method);
    }

    public length() : number {
        return this.fixed_uri.length() + this.regex_uri.length;
    }

    public has(uri:string): boolean {
        uri = this.normalize_uri(uri);
        return ((this.fixed_uri.has(uri)) || (this.isUriMatchToRegex(uri)));
    }

    public add (uri:string, options: RouteOptions) : void {
        uri = this.normalize_uri(uri);
        if (!this.has(uri.replace(/:/g,""))) {
            if (uri.indexOf(':') === -1 ) {
                this.fixed_uri.add(uri, this.route_builder.make(uri, options));
                console.log(uri + " added to fixed list ");
            } else {
                // make a regex for given uri with ':'
                let regex:string = "^" + uri.replace(/:\w+\//gi,"(\\w+)/");
                regex = regex.replace(/:\w+\./gi,"(\\w+)\.");
                regex = regex.replace(/:\w+$/gi,"(\\w+)");
                regex += '$';


                console.log("change " + uri + " to " + regex);
                let fixed_keys: Array<string> = this.fixed_uri.keys;
                // check if there will be a conflict with fixed Uri if the regex will add to as regex Uri
                for (let key_num = 0 ; key_num < fixed_keys.length; ++key_num) {
                    let route_uri: string = this.fixed_uri.get(fixed_keys[key_num]).Uri;
                    if (route_uri.match(regex)) {
                        console.log("regex Uri" + regex +" conflicted with : " + route_uri);
                        throw new RouteConflict(uri);
                    }
                }
                let route :Route = this.route_builder.make(regex, options);
                console.log("route obj: " + route.Middlewares);
                let params: string[] | null = uri.match(/:\w+([\/.]|$)/gi);
                if (params !== null) {
                    // get param names
                    console.log("before slice: "+ JSON.stringify(params));
                    params = params.map( (str) => {return str.replace(/[\/.:]/g,"");});
                    console.log("after slice: "+ JSON.stringify(params));
                    route.ParamKeys = params;
                }

                this.regex_uri.push(route);
                console.log(regex + " added to regex list ");
            }
        } else {
            /// TODO : exception throwing???
            console.log("double insertion for Uri : " + uri);
            throw new RouteConflict(uri);
        }

    }

    private normalize_uri (uri:string) :string {
        uri = uri.replace(/\\/g, "/");
        // cut off only the path part from uri using nodeJS url.parse()
        let temp:string | undefined = parse(uri, true).pathname;

        if (temp !== undefined){
            uri = temp;
        } else {console.log("url.parse is undefined.")}
        // drop '/' in the end of uri, if there is one.
        if (uri[uri.length-1] === '/') {
            uri = uri.slice(0,-1);
        }
        // add '/' in the beginning if there isn't one
        if (uri[0] !== '/') {
            uri = '/' + uri;
        }
        return uri;
    }

    public get(uri:string): Route {
        uri = this.normalize_uri(uri);
        if (this.fixed_uri.has(uri)) {
            return this.fixed_uri.get(uri);
        }
        return this.MatchRoute(uri);
    }

    private MatchRoute (uri:string) : Route {
        for (let index =0  ; index < this.regex_uri.length ; ++index) {
            let match = uri.match(this.regex_uri[index].Uri);
            console.log("try to match" + uri + " to "+ this.regex_uri[index].Uri);

            if (match !== null ) {
                let route = this.route_builder.make(uri, {target: this.regex_uri[index].Target});
                route.ParamKeys = this.regex_uri[index].ParamKeys;
                route.Middlewares = this.regex_uri[index].Middlewares;
                route.SetParamValues(match.slice(1));
                console.log("MatchRoute() returns: "+ JSON.stringify(route));
                return route;
            }
        }
        throw new NoRoute();
    }

    private isUriMatchToRegex (uri:string):boolean {
        for (let url_num =0 ; url_num < this.regex_uri.length; ++url_num) {
            let uri_regex:string = this.regex_uri[url_num].Uri;
            console.log("try to match " + uri + " to " + uri_regex);
            let match = uri.match(uri_regex);
            if (match !== null ) {
                console.log("find a match " + uri + " with " + uri_regex);
                return true;
            }
        }
        return false;
    }
}