import {Request} from "../Request";
import { Response } from "../Response";
import { AppConfig } from "../../App.config";

export class MiddlewareHandler {
    constructor(private request: Request, private response: Response) {}

    public async handle(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let middlewares: string[] = this.request.Middlewares;
            console.log(`start pass on ${middlewares.length} middlewares`);
            for (let i = 0; i < middlewares.length; i++) {
                if (!AppConfig.Middlewares.has(middlewares[i])) {
                    console.log(`reject deo to ${middlewares[i]} has not in Appconfig's middlewares`);
                    return reject(false);
                }

                let middleware = new (AppConfig.Middlewares.get(middlewares[i]))();
                console.log(`create middleware instance`);
                middleware.Request = this.request;
                middleware.Response = this.response;
                console.log(`await middleware instance`);
                let result = await middleware.handle();
                console.log(`get middleware result`);
                if (!result) {
                    console.log(`reject deo to ${middlewares[i]} has no result`);
                    return reject(false);
                }
            }
            console.log(`all middleware resolve`);
            return resolve(true);
        }).catch((reason: any) => false);
    }
}
