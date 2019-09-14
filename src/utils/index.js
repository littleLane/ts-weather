"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = function (data) { return Array.isArray(data); };
exports.isEmptyArray = function (data) { return exports.isArray(data) && !data.length; };
