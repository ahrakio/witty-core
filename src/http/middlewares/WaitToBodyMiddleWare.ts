import {Middleware} from "./Middleware";
import {HTTPRequest} from "../HTTPRequest";

export class WaitToBodyMiddleWare extends Middleware {
    public handle(): boolean | Promise<boolean> {
        return new Promise<boolean >(resolve => {
            console.log(`WaitToBodyMiddleWare start`);
            if (!(this.request instanceof HTTPRequest)) {
                console.log(`WaitToBodyMiddleWare not HTTP`);
                return true;
            } else {
                console.log(`WaitToBodyMiddleWare with HTTP`);
                let tmp: HTTPRequest = this.request as HTTPRequest;
                tmp.PromisedBody()
                    .then((data)=>resolve(true))
                    .catch((err)=>resolve(false));
            }

        }).catch(err=> false);
    }
}