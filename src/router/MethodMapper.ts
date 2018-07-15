import { Map } from "../utils/Map";
import { Route } from "./Route";
import NoRoute from "./exceptions/NoRoute";
import {RouteBuilder} from "./routes/RouteBuilder";
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

    public add (uri:string, target: string) : void {
        uri = this.normalize_uri(uri);
        if (!this.has(uri.replace(/:/g,""))) {
            if (uri.indexOf(':') === -1 ) {
                this.fixed_uri.add(uri, this.route_builder.make(uri, target));
                console.log(uri + " added to fixed list ");
            } else {
                // make a regex for given uri with ':'
                let regex:string = "^" + uri.replace(/:\w+\//gi,"(\\w+)/");
                regex = regex.replace(/:\w+\./gi,"(\\w+)\.");
                regex = regex.replace(/:\w+$/gi,"(\\w+)");


                console.log("change " + uri + " to " + regex);
                let fixed_keys: Array<string> = this.fixed_uri.keys;
                // check if there will be a conflict with fixed Uri if the regex will add to as regex Uri
                for (let key_num = 0 ; key_num < fixed_keys.length; ++key_num) {
                    let route_uri: string = this.fixed_uri.get(fixed_keys[key_num]).Uri;
                    if (route_uri.match(regex)) {
                        /// TODO : exception throwing???
                        console.log("regex Uri" + regex +" conflicted with : " + route_uri);
                        return;
                    }
                }
                let route :Route = this.route_builder.make(regex, target);
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
        }

    }

    private normalize_uri (uri:string) :string {
        uri = uri.replace(/\\/g, "/");
        if (uri[0] !== '/') {
            uri = '/' + uri;
        }
        return uri;
    }

    get (uri:string) : Route  {
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
            console.log("result :" + JSON.stringify(match));
            if (match !== null ) {
                let route = this.route_builder.make(uri, this.regex_uri[index].Target);
                route.ParamKeys = this.regex_uri[index].ParamKeys;
                route.SetParamValues(match.slice(1));
                console.log("MatchRoute: "+ JSON.stringify(route));
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
                console.log("first param is " + match[1]);
                // TODO parse parameters
                return true;
            }
        }
        return false;
    }
}