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

    keys(): string[] {
        let keys: string[] = [];

        for (let key in this.items) {
            keys.push(key);
        }

        return keys;
    }

    values(): T[] {
        let values: T[] = [];

        for (let key in this.items) {
            values.push(this.items[key]);
        }

        return values;
    }
}