const {Router} = require('express')
const path = require('path');
const router = Router()

router.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../views', 'index2.html'));
})

module.exports = router