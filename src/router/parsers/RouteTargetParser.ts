export default abstract class RouteTargetParser {
    constructor() {}

    public abstract parse(target: string): [string, string];
}