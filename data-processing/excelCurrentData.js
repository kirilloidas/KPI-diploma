const fs = require('fs');
const ExcelJS = require('exceljs');
const currentObject = require('./CurrentObject')


exports.setExcel = (data) => {
    if(data.data.length != 0) {
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    
    let labels = new Array()
    console.log(currentObject)
    Object.values(currentObject).map((val) => {
        labels.push(val)
    })

    console.log(data)
    console.log(labels)


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
            header: 'data',
            key: 'data',
            width: 16
        }
    ];

    for (let i = 0; i < data.data.length; i++) {
        if(currentObject[data.data[i].idnum]) {
            worksheet.addRow({label: currentObject[data.data[i].idnum], data: data.data[i].value}).commit()
        }
        

    }

    fs.unlinkSync('./data.xlsx');
    console.log('file deleted')
    //Save the workbook
    return workbook.xlsx.writeFile("data.xlsx");
    }
    

}