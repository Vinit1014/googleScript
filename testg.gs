function getSheetData() {
  // let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  // if (!sheet) { 
  //   Logger.log("Sheet not found! Check the sheet name.");
  //   return;
  // }

  // // let data = sheet.getDataRange().getValues();
  // let rowData = sheet.getRange(2,1,1,sheet.getLastColumn()).getValues()[0];
  // Logger.log(rowData); 

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  // Returns the list of active ranges.
  const activeRangeList = sheet.getActiveRange();
  const data = activeRangeList.getValues();
  Logger.log(data);

}
