export abstract class AppAbstract {
    constructor() {}

    private server: any;

    public bootstrap() {
        this.server.listen(8080, () => {
            console.log('Listening...');
        });
    }
}