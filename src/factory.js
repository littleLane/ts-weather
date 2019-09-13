"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory = function (configData) { return function (method) { return function (params) {
    return method(__assign(__assign({}, configData), params));
}; }; };
var URL = 'http://restapi.amap.com/v3/weather/weatherInfo';
var KEY = '5bf40bae03f0adf4f80b6c3b5dde89ad';
exports.default = factory({
    url: URL,
    key: KEY,
});
