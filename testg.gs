function getSheetData() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  // let data = sheet.getDataRange().getValues();

  if (!sheet) { // If the sheet is not found, log an error
    Logger.log("Sheet not found! Check the sheet name.");
    return;
  }

  var data = sheet.getDataRange().getValues(); // Get all data from the sheet
  Logger.log(data); // Log the data

  // Logger.log(data);

}
