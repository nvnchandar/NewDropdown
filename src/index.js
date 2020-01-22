import "./styles.css";
import * as data1 from "../data1.json";
import * as data2 from "../data2.json";
import * as rulesData from "../rulesData.json";
const getGSM = require("./gsm");
const getCFG = require("./cfg");
const getCGCMap = require("./cgcMapping");
const getSelectedList = require("./selectedList");

var masterData = {};
// console.log("com1", data1);
// console.log("com2", data2);
// console.log("rulesData", rulesData["default"]);

if (masterData["com1"] === undefined) {
  masterData["com1"] = {
    gsmList: data1.com1.gsmList,
    cfgList: data1.com1.cfgList
  };
  // console.log("masterData", masterData);
}
//

if (masterData["com2"] === undefined) {
  masterData["com2"] = {
    gsmList: data2.com2.gsmList,
    cfgList: data2.com2.cfgList
  };
  // console.log("masterData", masterData);
}

var commodityList = [
  { item_id: 0, item_text: "com4" },
  { item_id: 1, item_text: "com3" },
  { item_id: 2, item_text: "com2" },
  { item_id: 3, item_text: "com1" }
];

var commoditySelectedList = [
  { item_id: 2, item_text: "com1" },
  { item_id: 3, item_text: "com2" }
];

var gsmSelectedList = [
  { item_id: 0, item_text: "gsm3" },
  { item_id: 1, item_text: "gsm2" }
];

var cfgSelectedList = [
  { item_id: 0, item_text: "cf1" },
  { item_id: 1, item_text: "cf2" },
  { item_id: 2, item_text: "cf4" },
  { item_id: 3, item_text: "cf9" }
];

var gsmList = [];
var cfgList = [];
var reqComGsmCfgMap = {};

// // console.log("masterdata", masterData)

// getGSM(masterData, commoditySelectedList, gsmSelectedList).then(x => {
//   gsmList = JSON.parse(JSON.stringify(x.gsmList));
//   gsmSelectedList = JSON.parse(JSON.stringify(x.gsmSelectedList));
//   // console.log("gsmList",gsmList)
//   // console.log("gsmSelectedList",gsmSelectedList)
// });

// getCFG(
//   masterData,
//   commoditySelectedList,
//   gsmSelectedList,
//   cfgSelectedList
// ).then(x => {
//   cfgList = JSON.parse(JSON.stringify(x.cfgList));
//   cfgSelectedList = JSON.parse(JSON.stringify(x.cfgSelectedList));
//   // console.log("cfgList",cfgList)
//   // console.log("cfgSelectedList",cfgSelectedList)
// });

// getCGCMap(
//   masterData,
//   commoditySelectedList,
//   gsmSelectedList,
//   cfgSelectedList
// ).then(x => {
//   reqComGsmCfgMap = x;
//   // console.log("one", reqComGsmCfgMap);
// });

getSelectedList(rulesData["default"], commodityList).then(x => {
  console.log(x);
});
