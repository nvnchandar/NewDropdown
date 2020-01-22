const getSelectedList = async (rulesData, commodityList) => {
  var gsmObjectArray = [];
  var gsmSelectedList = [];
  var gsmKeys = [];
  var commoditySelectedList = [];
  var cfgSelectedList = [];
  var cfgKeys = [];

  // console.log("rulesData", rulesData)

  // 1st step: Filter the keys from commodity list to get selected comm.
  commoditySelectedList = await commodityList.filter(x => {
    if (Object.keys(rulesData).includes(x.item_text)) return true;
    else return false;
  });

  // 2nd step: Extract all the gsm object from rulesData
  await Object.values(rulesData).forEach(x => {
    gsmObjectArray.push(...x);
  });

  // 3rd step: Extract all the gsm keys
  await gsmObjectArray.forEach(obj => {
    gsmKeys.push(...Object.keys(obj));
  });

  // 4th step: Remove duplicate gsm keys and map as selected gsms.
  gsmSelectedList = await gsmKeys
    .filter(x => x !== "DBNULL")
    .reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, [])
    .map((x, i) => {
      return { item_id: i, item_text: x };
    });

  // 5th step: Extract all cfgs for each commodity.
  await Object.keys(rulesData).forEach(comm => {
    rulesData[comm].forEach((gsm, i) => {
      cfgKeys.push(...Object.values(rulesData[comm][i])[0]);
    });
  });

  // 6th step: Remove duplicate cfg keys and form selected cfgs
  cfgSelectedList = await cfgKeys
    .reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, [])
    .map((x, i) => {
      return { item_id: i, item_text: x };
    });

  return {
    commoditySelectedList: commoditySelectedList,
    gsmSelectedList: gsmSelectedList,
    cfgSelectedList: cfgSelectedList
  };
};

module.exports = getSelectedList;
