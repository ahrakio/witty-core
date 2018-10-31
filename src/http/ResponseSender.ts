import { Response } from "./Response";

export class ResponseSender {
    constructor(private response: Response, private res: any) {}

    send() {
        if (this.res.writeHead) {
            let h = this.response.Headers;
            let headers = {};

            for (let key of h.keys()) {
                headers[key] = h.get(key);
            }

            this.res.writeHead(this.response.StatusCode, headers);
        }
        this.res.write(this.response.Data);
        this.res.end();
    }
}
