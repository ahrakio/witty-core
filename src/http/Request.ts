import { RouteTargetParser } from "@ahrakio/witty-router";
import {Headers} from "./Headers";
import { Params } from "@ahrakio/witty-router";

export interface Request {
    Data: string;
    port:number;
    address:string;
    addressType:string;
    target:string;
    Middlewares: string[];
    parseTarget: (parser: RouteTargetParser)=>[string, string];

    // all the following are HTTP only.
    httpVersion?: string
    Headers? : Headers;
    QueryParams?: Params;
    UriParams?: Params;
    Method?: string;
    RawUri?: string;
    Path? :string;
    Body?: string; // alias for Data.
    PromisedBody?: () => Promise<string>;
    StreamedBody? : (next: (string) => void, end: () => void, error: (string) => void) => void;


}