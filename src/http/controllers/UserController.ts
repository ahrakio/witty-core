import Request from "../Request";
import Response from "../Response";
import Controller from "./Controller";

export default class UserController extends Controller {
    
    constructor() {
        super();
    }

    public try() {
        console.log('tryout');
        if (1 == 1) {
            return this.response.json({
                babi: 'hamra'
            }, 401);
        }



        console.log('indeed');
    }
}