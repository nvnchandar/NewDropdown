const getCGCMap = async (
  masterData,
  commoditySelectedList,
  gsmSelectedList,
  cfgSelectedList
) => {
  var reqObj = {};
  // 0 step: if no gsm and no cfg
  if (!(gsmSelectedList.length > 0) && !(cfgSelectedList.length > 0)) {
    commoditySelectedList.forEach(x => {
      reqObj[x.item_text] = [];
    });
  } else {
    // 1st step: if either gsm or cfg selected

    //2nd step: extract selected cfg list
    var selectedCFGL = cfgSelectedList.map(x => {
      return x.item_text;
    });

    //3rd step: extract selected gsm list
    var selectedGSML = gsmSelectedList.map(x => {
      return x.item_text;
    });
    await commoditySelectedList.forEach(comm => {
      let selectedcommGSMList = [];
      let selectedcommCFGList = [];

      // 4th step: Extract selected gsm's belong to each commodity
      selectedcommGSMList = selectedGSML.filter(x => {
        return masterData[comm.item_text].gsmList.includes(x);
      });
      // 5th step: Extract selected cfg's belong to each commodity
      selectedcommCFGList = selectedCFGL.filter(x => {
        return masterData[comm.item_text].cfgList.includes(x);
      });

      let gsmArray = [];
      //6th step: if any gsm selected for current commodity
      if (selectedcommGSMList.length > 0) {
        selectedcommGSMList.forEach(x => {
          let gsmObj = {};
          gsmObj[x] = selectedcommCFGList;
          gsmArray.push(gsmObj);
        });
      } else {
        //7th step: if no gsm selected for current commodity
        let gsmObj = {};
        gsmObj["DBNULL"] = selectedcommCFGList;
        gsmArray.push(gsmObj);
      }
      reqObj[comm.item_text] = gsmArray;
    });
  }
  return reqObj;
};

module.exports = getCGCMap;
