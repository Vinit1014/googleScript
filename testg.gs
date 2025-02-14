function getSheetData() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  if (!sheet) { 
    Logger.log("Sheet not found! Check the sheet name.");
    return;
  }
  
  let data = sheet.getDataRange().getValues();
  let rowData = sheet.getRange(2,1,1,sheet.getLastColumn()).getValues();
  Logger.log(rowData); 

}
