const {Router} = require('express')
const path = require('path');
const router = Router()

// router.get('/', (req, res) => {
//     res.status(200);
//     res.sendFile(path.join(__dirname, '../views', 'access.html'));
// })

router.get('/', function (req, res, next) {
    var filePath = "../"; // Or format the path using the `id` rest param
    var fileName = "data.xlsx"; // The default name the browser will use
    console.log('1');
    res.download(filePath, fileName); 
})

module.exports = router