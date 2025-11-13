// dotenvManager.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

interface DotenvConfigOptions {
    path?: string;
    encoding?: string;
    debug?: boolean;
}

class DotenvManager {
    private config: dotenv.DotenvParseOutput = {};
    private readonly options: DotenvConfigOptions;

    constructor(options: DotenvConfigOptions = {}) {
        this.options = { path: '.env', encoding: 'utf8', debug: false, ...options };
        this.load();
    }

    private load(): void {
        if (!fs.existsSync(this.options.path!)) {
            if(this.options.debug) console.warn(`dotenv: ${this.options.path} not found.`);
            return;
        }
        const parsed = dotenv.config(this.options).parsed || {};
        this.config = parsed;
        if(this.options.debug) console.log("dotenv loaded:", Object.keys(this.config).length, "variables");
    }

    public get<T = string>(key: string, defaultValue?: T): T | undefined {
        const value = this.config[key];
        return value !== undefined ? (value as any) as T : defaultValue;
    }

    public set(key: string, value: string): void {
        this.config[key] = value;
    }

    public save(filePath?: string): boolean {
        const filepathToSave = filePath || this.options.path!;
        const output = Object.entries(this.config)
            .map(([k, v]) => `${k}=${v}`)
            .join('\n');
        try {
            fs.writeFileSync(filepathToSave, output, this.options.encoding);
            return true;
        } catch (error) {
            console.error("Error saving .env:", error);
            return false;
        }
    }
}

export default DotenvManager;

// Example Usage (index.ts):
// import DotenvManager from './dotenvManager';

// const dotenvManager = new DotenvManager({ path: '.env', debug: true });

// const apiKey = dotenvManager.get('API_KEY', 'default_api_key');
// console.log('API Key:', apiKey);

// dotenvManager.set('NEW_VARIABLE', 'new_value');
// dotenvManager.save();