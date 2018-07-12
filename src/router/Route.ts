export abstract class Route {
    private target: string; 
    private uri: string;

    constructor(uri: string, target: string) {
        this.target = target;
        this.uri = uri;
    }
}