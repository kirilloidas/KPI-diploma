const keys = require('../keys/keys')

module.exports = function (email) {
    console.log('yes');
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Отриман Excel файл',
        html: `
            <p>Файл з данними</p>
        `,
        attachments: [
            {path: './data.xlsx'}
        ]
    }
}