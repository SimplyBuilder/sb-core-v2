import { readFileSync } from 'node:fs';
import rollupSchema from "../../rollup.config.js";

const {version} = JSON.parse(readFileSync('./package.json', 'utf-8'));

const libName = "SBCoreEvent";
let current_version = "0.0.0.0";
if(version) current_version = version

const {defineConfig, normal, minify, internal, plugins} = rollupSchema({libName, version});

const output = [
    {
        ...internal("main")
    },
    {
        ...normal("esm")
    },
    {
        ...minify("esm")
    },
    {
        ...normal("commonjs")
    },
    {
        ...minify("commonjs")
    }
];

const rollup_config = {
    input: "audit/main.js",
    output,
    plugins
};

export default defineConfig(rollup_config);