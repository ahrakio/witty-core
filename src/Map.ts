export class Map<T> {
    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    add(key: string, value: T): void {
        this.items[key] = value;
    }

    has(key: string): boolean {
        return key in this.items;
    }

    get(key: string): T {
        return this.items[key];
    }

    length() : number {
        return  Object.keys(this.items).length;
    }

    getKeys() : Array<string> {
        return Object.keys(this.items);
    }
}