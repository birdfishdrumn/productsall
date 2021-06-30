"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Layout_1 = require("components/Layout");
var PostItem_1 = require("components/PostItem");
var getPost_1 = require("fooks/getPost");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var quantity = function () {
    var posts = getPost_1.useAllPost().posts;
    return (react_1["default"].createElement(Layout_1["default"], { title: "\u8CA9\u58F2\u5546\u54C1" },
        react_1["default"].createElement("div", { className: "container mx-auto px-4 sm:px-8" },
            react_1["default"].createElement("div", { className: "py-8" },
                react_1["default"].createElement("div", { className: "-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto" },
                    react_1["default"].createElement("div", { className: "inline-block min-w-full shadow rounded-lg overflow-hidden" },
                        react_1["default"].createElement("table", { className: "min-w-full leading-normal" },
                            react_1["default"].createElement("thead", null,
                                react_1["default"].createElement("tr", null,
                                    react_1["default"].createElement("th", { className: "py-1 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" }, "\u5546\u54C1\u540D"),
                                    react_1["default"].createElement("th", { className: "px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" }, "\u5024\u6BB5"),
                                    react_1["default"].createElement("th", { className: "px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" }, "\u8CA9\u58F2\u6570"),
                                    react_1["default"].createElement("th", { className: "px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" }, "\u5728\u5EAB"),
                                    react_1["default"].createElement("th", { className: "px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" }, "\u8CA9\u58F2\u6570"),
                                    react_1["default"].createElement("th", { className: "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" }, "\u7DE8\u96C6"))),
                            posts.length ? posts.map(function (post) { return react_1["default"].createElement(PostItem_1["default"], { post: post }); }) :
                                react_1["default"].createElement("div", { className: "text-gray-400 text-center m-8 text-lg mx-auto " },
                                    react_1["default"].createElement(CircularProgress_1["default"], null)))))))));
};
exports["default"] = quantity;
