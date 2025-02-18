function onEdit(e){
  let range = e.range;
  let spreadSheet = e.source;
  let sheetName = spreadSheet.getActiveSheet().getName();
  let column = range.getColumn();
  let row = range.getRow();
  let inputValue = e.value;
 
  if(sheetName == 'Sheet1' && column == 2 )
  {
    Logger.log(inputValue);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1').getRange('D2').setValue([inputValue]);
  }

}