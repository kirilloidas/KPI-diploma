const fs = require('fs');
const ExcelJS = require('exceljs');



exports.setExcel = (data) => {
    fs.unlinkSync('./data.xlsx');
    console.log('file deleted')
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');


    let labels = ['Об`єм (маса) каналу витрати 1', 'Значення температури ТСП 1 * 100', 'Значення температури ТСП 2 * 100', 'Тепло', 'Час роботи лічильника, год', 'Час помилок', 'Введені користувачем константи тиску * 1000', 'Введені користувачем константи тиску * 1000', 'Спожита енергія', 'Температура всередині корпусу'];


    worksheet.columns = [{
            header: 'label',
            key: 'label',
            width: 64,
            style: {
                font: {
                    name: 'Arial Black'
                }
            }
        },
        {
            header: 'time',
            key: 'time',
            width: 32
        },
        {
            header: 'data',
            key: 'data',
            width: 16
        }
    ];

    for (let i = 0; i < data.dataArr.length; i++) {
        for (let j = 0; j < data.date.length; j++) {
            let label;
            if (j == 0) {
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
            worksheet.addRow(dataObj).commit();
        }
    }



    //Save the workbook
    return workbook.xlsx.writeFile("data.xlsx");

}