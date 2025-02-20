function createOnEditTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === "onEditHandler") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger("onEditHandler") 
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
  
  Logger.log("Installable onEdit trigger created!");
}

function onEditHandler(e) {
  try {
    let range = e.range;
    let spreadSheet = e.source;
    let sheet = spreadSheet.getActiveSheet();
    let sheetName = sheet.getName();
    let column = range.getColumn();
    let row = range.getRow();
    let inputValue = e.value;
    let cidValue = sheet.getRange(row, 1).getValue();
    
    if (sheetName == 'Sheet1' && column == 2) { 
      Logger.log("Edited Value: " + inputValue + ", CID: " + cidValue);
      
      sheet.getRange(row, 4).setValue(inputValue);
      
      sendDataToAPI(cidValue, inputValue);
    }
  } catch (error) {
    Logger.log("Error in onEditHandler: " + error.toString());
  }
}

function sendDataToAPI(cid, value) {
  const secretKey = "12345678"; 
  const url = "https://9fe5-103-145-8-226.ngrok-free.app/googleSheets/edit1.php";
  try {
    const postData = {
      "secret": secretKey,
      "cid": cid,
      "value": value
    };
    
    const options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(postData),
      "muteHttpExceptions": true
    };
    
    Logger.log("Sending POST request to: " + url);
    Logger.log("With data: " + JSON.stringify(postData));
    
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Response Code: " + response.getResponseCode());
    Logger.log("Response Text: " + response.getContentText());
    
  } catch (error) {
    Logger.log("Error in sendDataToAPI: " + error.toString());
  }
}



