export abstract class AppAbstract {
    constructor() {}

    private server: any;
    private port: number;

    public bootstrap() {

        this.port = 8400;

        if (typeof process.argv[2] !== 'undefined') {
            this.port = +process.argv[2];
        }
        
        this.server.listen(this.port, () => {
            console.log('Listening...');
        });
    }
}