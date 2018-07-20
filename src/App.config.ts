import {Controller} from "./http/controllers/Controller";
import { Map } from "./utils/Map";

export class AppConfig {
    private static controllers: Map<{new(): Controller}>;

    static set Controllers(value: Map<{new(): Controller}>) {
        AppConfig.controllers = value;
    }

    static get Controllers(): Map<{new(): Controller}> {
        return AppConfig.controllers;
    }
}