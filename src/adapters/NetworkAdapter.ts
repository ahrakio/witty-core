export abstract class NetworkAdapter {
    protected server: any;
    protected port: number;
    protected protocol: string;

    constructor() {
        this.port = -1;
        this.server = null;
    }

    public abstract listen(port: number);
    public abstract close();

    public get Protocol(): string {
        return this.protocol;
    }
}
