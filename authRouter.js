const Router = require('express')
const router = new Router()
const controller = require('./authController.js')
// const {check} = require("express-validator")
// const authMiddleware = require('./middlewaree/authMiddleware')
// const roleMiddleware = require('./middlewaree/roleMiddleware')

// router.post('/registration', [
//     check('username', "Имя пользователя не может быть пустым").notEmpty(),
//     check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], controller.registration)
// router.post('/login', controller.login)
// router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
router.post('/registration', controller.registration)
router.post('/login', controller.login)

module.exports = router
