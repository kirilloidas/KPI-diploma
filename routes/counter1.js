const {Router} = require('express')
const path = require('path');
const router = Router()

router.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../views', 'index1.html'));
})

module.exports = router