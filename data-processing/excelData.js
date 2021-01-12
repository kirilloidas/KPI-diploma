const fs = require('fs');
const ExcelJS = require('exceljs');
// const workbook = new ExcelJS.Workbook();



exports.setExel = (data) => {
    fs.unlinkSync('./data.xlsx');
    console.log('file deleted')
    const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');
//   const fakeData =  {
//     address: "well st",
//     description: "180036710",
//     fromTotal: 1.365
//   };
//   worksheet.columns = [
//     { header: 'address', key: 'address', width: 10 },
//     { header: 'description', key: 'description', width: 32, style: { font: { name: 'Arial Black' } } },
//     { header: 'fromTotal.', key: 'fromTotal', width: 10, style: { numFmt: 'dd/mm/yyyy' } }
//   ];
//   worksheet.addRow(fakeData).commit();
//   return workbook.xlsx.writeFile("data.xlsx");




    // workbook.xlsx.readFile("data.xlsx").then(function () {
    //     let worksheet=workbook.getWorksheet('Лист1');
        

        let labels = ['Об`єм (маса) каналу витрати 1', 'Значення температури ТСП 1 * 100', 'Значення температури ТСП 2 * 100', 'Тепло', 'Час роботи лічильника, год', 'Час помилок', 'Введені користувачем константи тиску * 1000', 'Введені користувачем константи тиску * 1000', 'Спожита енергія', 'Температура всередині корпусу'];
        
    
        worksheet.columns = [
            { header: 'label', key: 'label',width: 64, style: { font: { name: 'Arial Black' } } },
            { header: 'time', key: 'time', width: 32},
            { header: 'data', key: 'data', width: 16}
          ];

        for(let i = 0; i < data.dataArr.length; i++) {
            for(let j = 0; j < data.date.length; j++) {
                let label;
                if(j == 0) {
                    worksheet.addRow([]).commit();
                    label = labels[i];
                } else {
                    label = "";
                }
                let dataObj = {
                    label: label,
                    time: data.date[j],
                    data: data.dataArr[i][j]
                }
                // console.log(dataObj)
                worksheet.addRow(dataObj).commit();
            }
        }

        // clearExcel(worksheet);
        
    
        //Save the workbook
        return workbook.xlsx.writeFile("data.xlsx");
    
    // });
}

function clearExcel(worksheet) {
    // console.log('1',worksheet.getRow(4).getCell(1).value)
    // if(worksheet.getRow(4).getCell(1).value == "" || worksheet.getRow(4).getCell(1).value == null || worksheet.getRow(4).getCell(1).value == undefined) {
    //     console.log('lol');
    // }

    let a = 1;
    let isData = true;

    // while(isData) {
    //     if(worksheet.getRow(a).getCell(2).value == "" && worksheet.getRow(a + 1).getCell(2).value == "") {
    //         isData = false;
    //         break;
    //     } else if (worksheet.getRow(a).getCell(2).value == "" && worksheet.getRow(a + 1).getCell(2).value !== "") {
    //         a++;
    //         continue;
    //     } else {
    //         worksheet.spliceRows(a, 1);
    //     }
    //     a++;
    // }
}


