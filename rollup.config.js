import {defineConfig} from "rollup";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";

const schema_output = {
    strict: true,
    extend: true,
    validate: true,
    compact: true,
    freeze: true,
    generatedCode: {
        //preset: 'es5',
        arrowFunctions: true,
        constBindings: true,
        objectShorthand: true,
        symbols: true,
    },
    footer: "/*! https://simplybuilder.github.io */"
};

const format_ext = {
    "module": "mjs",
    "es": "mjs",
    "esm": "mjs",
    "common": "cjs",
    "commonjs": "cjs",
    "umd": "js",
    "iife": "js",
    "system": "js",
    "systemjs": "js",
    "cjs": "cjs"
};

const normal_file = (data = {}) => {
    const {format = "esm", output = {}} = data;
    let schema = {};
    if(typeof output === "object") schema = {...output};
    schema["file"] = `lib/main.${format}.${format_ext[format]}`;
    schema["format"] = format;
    return Object.freeze(schema);
};
const internal_file = (data = {}) => {
    const {name, output = {}} = data;
    let schema = {};
    if(typeof output === "object") schema = {...output};
    schema["file"] = `lib/${name}.js`;
    schema["format"] = "module";
    return Object.freeze(schema);
};
const minify_file = (data) => {
    const {format = "esm", output = {}} = data;
    let schema = {};
    if(typeof output === "object") schema = {...output};
    schema["file"] = `lib/main.${format}.min.${format_ext[format]}`;
    schema["format"] = format;
    schema["plugins"] = [
        terser({
            module: true,
            compress: {
                drop_console: ['log', 'info']
            },
            ecma: 2020,
            keep_classnames: true,
            keep_fnames: true
        })
    ];

    return Object.freeze(schema);
};

const rollup_config = (data = {}) => {
    const {libName, version, footer} = data;
    const lib_output = {...schema_output};
    if(libName) {
        lib_output["name"] = libName;
        if(version) lib_output["banner"] = `/*! ${libName} version ${version} */`;
    }
    if(footer) lib_output["footer"] = footer;

    const plugins = [
        nodeResolve(),
        replace({
            preventAssignment:true,
            'ModuleLibName': libName,
            'ModuleLibVersion': version
        })
    ];

    return {
        plugins, defineConfig,
        internal: (name) => {
            const output = {...lib_output};
            output["banner"] = null;
            output["footer"] = null;
            return internal_file({name, format: "esm", output})
        },
        normal: (format) => normal_file({format, output: lib_output}),
        minify: (format) => minify_file({format, output: lib_output})
    }
};

export default Object.freeze(rollup_config);