// const Scene = require('telegraf/scenes/base')
const {
    Telegraf,
    Markup,
    session,
    Scenes: { BaseScene, Stage }
} = require("telegraf");
const authController = require('../authController')

class SceneGenerator {
    constructor() {
        this.username = '',
        this.password = ''
    }
    authScene() {
        const auth = new BaseScene('auth')
        auth.enter(async (ctx) => {
            this.username = '',
            this.password = ''
            await ctx.reply('Введите, пожалуйста, свой логин:')
        })
        auth.on('text', async (ctx) => {
            if(this.username === '') {
                this.username = ctx.message.text
                await ctx.reply('Теперь введите пароль:')
            } else {
                this.password = ctx.message.text
                // await ctx.reply('Сверяем с базой данных...')
                authController.loginTelegram(this.username, this.password)
                    .then(res => {
                        if(res.token) {
                            ctx.reply('Авторизация прошла успешно')
                        } else {
                            ctx.reply(res.message)
                            setTimeout(() => {
                                ctx.scene.reenter()
                            }, 500);
                        }
                    })
                // await ctx.reply(authController.loginTelegram(this.username, this.password))
            }
            
        })
        // auth.on('text', async (ctx) => {
            
        // })
        return auth
    }
}

module.exports = SceneGenerator