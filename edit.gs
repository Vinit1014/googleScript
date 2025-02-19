function onEdit(e){
  let range = e.range;
  let spreadSheet = e.source;
  let sheetName = spreadSheet.getActiveSheet().getName();
  let column = range.getColumn();
  let row = range.getRow();
  let inputValue = e.value;
  // let cid = getRange(row, 1);
  
  if(sheetName == 'Sheet1' && column == 2 )
  {
    // Logger.log(cid);
    // Logger.log("Getting the value "+inputValue+" and CID is "+cid);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1').getRange(row, 4).setValue([inputValue]);
  }

}