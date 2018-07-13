import Request from "./Request";
import RouteDefaultParser from '../router/parsers/RouteDefaultParser';
import Response from "./Response";
import Controller from "./controllers/Controller";

export default class RequestHandler { 
    private controller: Controller;
    private method: string;

    constructor(private request: Request, private response: Response) {
        let parsed = request.Route.parseTarget(new RouteDefaultParser());

        try {
            this.controller = eval(`new ${parsed[0]}()`);
            this.method = parsed[1];
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public handle(): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            // Run the controller and middlewares

        })
    }

    
}