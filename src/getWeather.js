"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("colors"));
var axios_1 = __importDefault(require("axios"));
var factory_1 = __importDefault(require("./factory"));
// tslint:disable-next-line: no-console
var log = console.log;
function handleResole(weatherData) {
    // status 为 0 时表示查询失败
    if (weatherData.status === '0') {
        log(colors_1.default.red('天气信息查询失败！'));
        return;
    }
    // count 为 0 表示没有查到天气信息
    if (weatherData.count === '0') {
        log(colors_1.default.yellow('天气信息查询失败！'));
        return;
    }
    // 获取并输出第一条天气信息
    var live = weatherData.lives[0];
    log('================天气预报 start====================');
    log(colors_1.default.bold("\u9884\u62A5\u65F6\u95F4\uFF1A"), colors_1.default.yellow("" + live.reporttime));
    log(colors_1.default.bold("\u9884\u62A5\u5730\u533A\uFF1A"), colors_1.default.white(live.province + " " + live.city));
    log(colors_1.default.bold("\u9884\u62A5\u8BE6\u60C5\uFF1A"), colors_1.default.green(live.weather + " " + live.temperature + "\u2103 " + live.winddirection + "\u98CE"));
    log('================天气预报 end====================');
}
function handleReject() {
    log(colors_1.default.red('天气服务出现异常！'));
}
// promise 模式实现
// function getWeather(params: IParams) {
//     const requestUrl: string = `${params.url}?city=${encodeURI(params.city)}&key=${params.key}`;
//     axios.get(requestUrl).then((res: AxiosResponse<IWeatherResponse>) => {
//         handleResole(res.data);
//     }).catch(() => {
//         handleReject();
//     });
// }
// async await  模式实现
function getWeather(params) {
    return __awaiter(this, void 0, void 0, function () {
        var queryParams, requestUrl, resData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!params.city) {
                        log(colors_1.default.red("'city' is required\uFF01"));
                        return [2 /*return*/];
                    }
                    queryParams = Object.keys(params)
                        .reduce(function (querys, key) {
                        if (key !== 'url' && params[key]) {
                            return querys.concat(key + "=" + encodeURI(params[key]));
                        }
                        return querys;
                    }, [])
                        .join('&');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    requestUrl = params.url + "?" + queryParams;
                    return [4 /*yield*/, axios_1.default.get(requestUrl)];
                case 2:
                    resData = _a.sent();
                    handleResole(resData.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    handleReject();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = factory_1.default(getWeather);
