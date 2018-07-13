import Request from "./Request";
import RouteDefaultParser from '../router/parsers/RouteDefaultParser';
import Response from "./Response";

export default class RequestHandler { 
    constructor(private request: Request, private response: Response) {
        request.Route.parseTarget(new RouteDefaultParser());
        
    }

    public handle(): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            // Run the controller and middlewares
        })
    }

    
}