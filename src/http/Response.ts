export default class Response {
    private data: string;
    private statusCode: number;
    private resolve: any; 
    private reject: any; 

    constructor() {
        this.data = "";
        this.statusCode = 200;
    }

    set Resolve(value: any) {
        this.resolve = value;
    }
    
    set Reject(value: any) {
        this.reject = value;
    }

    set Data(value: any) {
        this.data = value;
    }

    set StatusCode(value: number) {
        this.statusCode = value;
    }

    json(data: any, statusCode: number = 200) {
        this.data = JSON.stringify(data);
        this.statusCode = statusCode;
        this.resolve(this);
    }

    send(res: any) {
        res.writeHead(404);
        res.write(this.data);
        res.end();
    }


}