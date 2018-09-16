import { Request } from "./Request";
import { RouteDefaultParser } from "../router/parsers/RouteDefaultParser";
import { Response } from "./Response";
import { NoController } from "./exceptions/NoController";
import { NoMethod } from "./exceptions/NoMethod";
import { AppConfig } from "../App.config";

export class RequestHandler {
    private controller: string;
    private method: string;

    constructor(private request: Request, private response: Response) {
        let parsed = request.parseTarget(new RouteDefaultParser());

        this.controller = parsed[0];
        this.method = parsed[1];
    }

    public handle(): Promise<Response> {
        if (!AppConfig.Controllers.has(this.controller)) {
            throw new NoController();
        }

        let controller = AppConfig.Controllers.get(this.controller);
        let controllerInstance = new controller();

        if (typeof controllerInstance[this.method] !== "function") {
            throw new NoMethod();
        }

        return new Promise((resolve, reject) => {
            // Run the controller and middlewares
            this.response.Reject = reject;
            this.response.Resolve = resolve;

            controllerInstance.Request = this.request;
            controllerInstance.Response = this.response;

            controllerInstance[this.method]();
        });
    }
}
