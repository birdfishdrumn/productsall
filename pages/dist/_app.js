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
exports.__esModule = true;
var react_1 = require("react");
var recoil_1 = require("recoil");
require("tailwindcss/tailwind.css");
var FullScreenDialog_1 = require("components/Ui/FullScreenDialog ");
var Dialog_1 = require("components/Ui/Dialog");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
// import {theme} from "styles/theme";
var App = function (_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    react_1["default"].useEffect(function () {
        var jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (react_1["default"].createElement(recoil_1.RecoilRoot, null,
        react_1["default"].createElement(Dialog_1["default"], null),
        react_1["default"].createElement(FullScreenDialog_1["default"], null),
        react_1["default"].createElement(react_toastify_1.ToastContainer, null),
        react_1["default"].createElement(Component, __assign({}, pageProps))));
};
exports["default"] = App;
