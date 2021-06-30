"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var Drawer_1 = require("components/Drawer");
var getPost_1 = require("fooks/getPost");
var Layout_1 = require("components/Layout");
var store_1 = require("store/store");
var recoil_1 = require("recoil");
var PostList = function () {
    var _a = react_1.useState([]), list = _a[0], setList = _a[1];
    var _b = recoil_1.useRecoilState(store_1.orderState), orders = _b[0], setOrders = _b[1];
    var posts = getPost_1.useAllPost().posts;
    react_1.useEffect(function () {
        axios_1["default"].get(process.env.NEXT_PUBLIC_HOST + "/api/v2/orders").then(function (res) {
            setList(res.data.orders);
        });
    }, []);
    // 商品を買い物カゴに入れる処理
    var handleChange = function (post) {
        setOrders(function (prevState) { return __spreadArrays(prevState, [post]); });
    };
    console.log(orders);
    console.log(posts);
    return (react_1["default"].createElement(Layout_1["default"], { title: "\u6CE8\u6587\u4F1A\u8A08" },
        react_1["default"].createElement(Drawer_1["default"], { orders: orders, setOrders: setOrders, handleChange: handleChange })));
};
exports["default"] = PostList;
