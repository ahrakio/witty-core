export abstract class AppAbstract {
    constructor() {}

    private server: any;

    public bootstrap() {
        console.log('>> ' + process.argv[0] + ' ' + process.argv[1]);
        this.server.listen(8080, () => {
            console.log('Listening...');
        });
    }
}