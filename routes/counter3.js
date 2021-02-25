const {Router} = require('express')
const path = require('path');
const router = Router()

router.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../views', 'index3.html'));
})

module.exports = router