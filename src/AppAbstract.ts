export abstract class AppAbstract {
    constructor() {}

    private server: any;
    private port: number;

    public bootstrap() {

        this.port = 8400;
        console.log(this.port);
        
        if (typeof process.argv[2] !== undefined) {
            this.port = +process.argv[2];
        }

        console.log(this.port);
        console.log(process.argv);
        console.log(process.argv[2]);
        console.log(process.argv[3]);
        console.log(+process.argv[2]);
        
        this.server.listen(this.port, () => {
            console.log('Listening...');
        });
    }
}