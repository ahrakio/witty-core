export abstract class AppAbstract {
    constructor() {}

    private server: any;
    private port: number;

    public bootstrap() {

        try {
            this.port = +process.argv[2];
        } catch (e) {
            this.port = 8400;
        }

        console.log(this.port);
        
        this.server.listen(this.port, () => {
            console.log('Listening...');
        });
    }
}