import ResponseSentError from "./exceptions/ResponseSentError";

export default class Response {
    private data: any;
    constructor(private res: any) {}

    static json(data: any, statusCode: number) {
        

        throw new ResponseSentError();
    }
    
}