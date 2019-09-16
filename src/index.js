"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var commander_1 = __importDefault(require("commander"));
var colors_1 = __importDefault(require("colors"));
var package_json_1 = __importDefault(require("../package.json"));
var getWeather_1 = __importDefault(require("./getWeather"));
// we 询问形式
if (process.argv.slice(2).length === 0) {
    var promptList = [
        {
            type: 'input',
            message: 'Input city of chinese name',
            name: 'city',
            default: undefined,
        },
        {
            type: 'list',
            message: 'Input real-time type',
            name: 'extensions',
            choices: [
                {
                    key: 'all',
                    name: 'all',
                    value: 'all',
                },
                {
                    key: 'base',
                    name: 'base',
                    value: 'base',
                },
            ],
        },
    ];
    inquirer_1.default.prompt(promptList).then(function (answers) {
        getWeather_1.default(answers);
    });
}
else {
    // we --city 成都 --type base
    var command = commander_1.default
        .allowUnknownOption()
        .version(package_json_1.default.version)
        .option('-c, --city [name]', 'Input city of chinese name')
        .option('-t, --type [type]', 'Input real-time type')
        .parse(process.argv);
    if (!command.city) {
        console.error('There are two ways to play:');
        console.log();
        console.log('Example:');
        console.log("    " + colors_1.default.cyan(command.name()));
        console.log("  " + colors_1.default.yellow('OR'));
        console.log("    " + colors_1.default.cyan(command.name()) + " " + colors_1.default.green('--city [cityName] --type [type]'));
        console.log();
        command.outputHelp();
        process.exit();
    }
    getWeather_1.default({
        city: command.city,
        extensions: command.type,
    });
}
