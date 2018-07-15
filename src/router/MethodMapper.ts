import { Map } from "../Map";
import { Route } from "./Route";
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
        return ((this.fixed_uri.has(uri)) || (this.isUriMatchToRegex(uri)));
    }

    public add (uri:string, target: string) : void {
        if (!this.has(uri.replace(':',""))) {
            if (uri.indexOf(':') === -1 ) {
                this.fixed_uri.add(uri, this.route_builder.make(uri, target));
                console.log(uri + " added to fixed list ");
            } else {
                let regex:string = uri.replace(/:\w+\//gi,"(\\w+\)/");
                console.log("change " + uri + " to " + regex);
                let fixed_keys: Array<string> = this.fixed_uri.getKeys();
                // check if there will be a conflict with fixed uri if the regex will add to as regex uri
                for (let key_num = 0 ; key_num < fixed_keys.length; ++key_num) {
                    let route_uri: string = this.fixed_uri.get(fixed_keys[key_num]).get_uri();
                    if (route_uri.match(regex)) {
                        /// TODO : exception throwing???
                        console.log("regex uri" + regex +" conflicted with : " + route_uri);
                        return;
                    }
                }
                this.regex_uri.push(this.route_builder.make(regex, target));
                console.log(regex + " added to regex list ");
            }
        } else {
            /// TODO : exception throwing???
            console.log("double insertion for uri : " + uri);
        }

    }

    private isUriMatchToRegex (uri:string):boolean {
        for (let url_num =0 ; url_num < this.regex_uri.length; ++url_num) {
            let uri_regex:string = this.regex_uri[url_num].get_uri();
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