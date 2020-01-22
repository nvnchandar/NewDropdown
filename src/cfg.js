const getCFG = async (
  masterData,
  commoditySelectedList,
  gsmSelectedList,
  cfgSelectedList
) => {
  var cfgList = [];

  // console.log(masterData)
  // console.log(commoditySelectedList)

  // 1st step: if gsm is not selected, extract all cfgs for only comm combination.
  await commoditySelectedList.forEach(comm => {
    cfgList.push(...masterData[comm.item_text].cfgList);
  });
  // console.log(cfgList);

  // 2nd step: Remove duplicate cfg keys
  cfgList = await cfgList
    .reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, [])
    .map((x, i) => {
      return { item_id: i, item_text: x };
    });

  // console.log(cfgList);

  // 3rd step: Form the cfg selected from the available cfg keys.
  cfgSelectedList = await cfgList.filter(x => {
    if (cfgSelectedList.findIndex(y => y.item_text === x.item_text) > -1)
      return true;
    else return false;
  });

  return {
    cfgSelectedList: cfgSelectedList,
    cfgList: cfgList
  };
};

module.exports = getCFG;
