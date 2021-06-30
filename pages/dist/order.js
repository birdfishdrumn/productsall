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
exports.__esModule = true;
var react_1 = require("react");
var Layout_1 = require("components/Layout");
var axios_1 = require("axios");
var dayjs_1 = require("dayjs");
require("dayjs/locale/ja");
var ReactDatePicker_1 = require("components/ReactDatePicker");
var IconButton_1 = require("@material-ui/core/IconButton");
var Search_1 = require("@material-ui/icons/Search");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
dayjs_1["default"].locale('ja');
var order = function () {
    var initialDate = new Date();
    var _a = react_1.useState([]), orders = _a[0], setOrders = _a[1];
    var _b = react_1.useState(0), sumPrice = _b[0], setSumPrice = _b[1];
    var _c = react_1.useState(null), search = _c[0], setSearch = _c[1];
    var _d = react_1.useState(initialDate), startDate = _d[0], setStartDate = _d[1];
    var handleGetPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); };
    var date = dayjs_1["default"](startDate).format('YYYY-MM-DD');
    var handlePush = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var resData, resPriceData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post(process.env.NEXT_PUBLIC_HOST + "/api/v2/searchDate", {
                        date: date
                    })];
                case 1:
                    resData = _a.sent();
                    return [4 /*yield*/, axios_1["default"].post(process.env.NEXT_PUBLIC_HOST + "/api/v2/orderPrice", {
                            date: date
                        })];
                case 2:
                    resPriceData = _a.sent();
                    setSearch(date);
                    setOrders(resData.data.orders);
                    setSumPrice(resPriceData.data);
                    return [2 /*return*/];
            }
        });
    }); }, [date]);
    react_1.useEffect(function () {
        axios_1["default"].get(process.env.NEXT_PUBLIC_HOST + "/api/v2/orders").then(function (res) {
            setOrders(res.data.orders);
        });
        axios_1["default"].get(process.env.NEXT_PUBLIC_HOST + "/api/v2/orderPrice").then(function (res) {
            setSumPrice(res.data);
            console.log(res.data);
        });
    }, []);
    return (react_1["default"].createElement(Layout_1["default"], { title: "\u6CE8\u6587\u30EA\u30B9\u30C8" },
        react_1["default"].createElement("div", { id: "menu", className: "container mx-auto px-4 lg:pt-24 lg:pb-64" },
            react_1["default"].createElement("div", { className: "flex flex-wrap text-center justify-center" },
                react_1["default"].createElement("div", { className: "w-full lg:w-6/12 px-4" },
                    react_1["default"].createElement("h2", { className: "text-4xl font-semibold text-black" }, "\u6CE8\u6587\u5C65\u6B74"),
                    react_1["default"].createElement("p", { className: "m-4 " },
                        search && search,
                        "\u306E\u691C\u7D22\u7D50\u679C"))),
            react_1["default"].createElement("div", { className: "mx-auto text-center" },
                react_1["default"].createElement(IconButton_1["default"], { onClick: function () { return handlePush(); } },
                    react_1["default"].createElement(Search_1["default"], null)),
                react_1["default"].createElement(ReactDatePicker_1["default"], { startDate: startDate, setStartDate: setStartDate })),
            react_1["default"].createElement("h1", { className: "text-gray-400 m-8 text-2xl text-center" },
                "\u5408\u8A08\u91D1\u984D",
                sumPrice),
            orders.length ? (orders.map(function (order) { return (react_1["default"].createElement("div", { className: "flex flex-wrap mt-12 justify-center border-b-2 max-w-2xl mx-auto pb-4" },
                react_1["default"].createElement("div", { className: "grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4" },
                    react_1["default"].createElement("div", { className: "col-span-2 sm:col-span-1 xl:col-span-1" },
                        react_1["default"].createElement("img", { alt: "...", src: order.image, className: "h-24 w-24 rounded  mx-auto" })),
                    react_1["default"].createElement("div", { className: "col-span-2 sm:col-span-4 xl:col-span-4" },
                        react_1["default"].createElement("h3", { className: "font-semibold text-black" }, order.name),
                        react_1["default"].createElement("p", { className: "my-4 text-gray-400" }, dayjs_1["default"](order.created_at).format('YYYY/MM/DD HH:mm'))),
                    react_1["default"].createElement("div", { className: "text-red-400 text-lg col-span-2 sm:col-span-1 xl:col-span-1 italic my-auto" },
                        "\u00A5",
                        order.price)))); }))
                : (react_1["default"].createElement("p", { className: "text-gray-400 text-center my-4 text-lg" },
                    react_1["default"].createElement(CircularProgress_1["default"], null))))));
};
exports["default"] = order;
// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()
//   return {
//     props: { events},
//     revalidate:1
//   }
// }
