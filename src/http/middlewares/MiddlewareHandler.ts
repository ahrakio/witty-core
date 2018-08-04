import { Request } from "../Request";
import { Response } from "../Response";
import { AppConfig } from '../../App.config';
import { NoMiddleware } from "../exceptions/NoMiddleware";

export class MiddlewareHandler {
    constructor(private request: Request, private response: Response) {}

    public async handle(): Promise<boolean> {
        let middlewares: string[] = this.request.Route.Middlewares;
        let final_result;
        
        for (let i = 0; i < middlewares.length; i++) {
            if (!AppConfig.Middlewares.has(middlewares[i])) {
                throw new NoMiddleware();
            }

            let result = (new (AppConfig.Middlewares.get(middlewares[i]))).handle();

            if (result instanceof Promise) {
                final_result = await result;
            } else {
                final_result = result;
            }

            if (!final_result) {
                return await false;
            }
        }

        return await true;
    }
}