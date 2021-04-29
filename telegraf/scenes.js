// const Scene = require('telegraf/scenes/base')
const {
    Telegraf,
    Markup,
    session,
    Scenes: { BaseScene, Stage }
} = require("telegraf");
const authController = require('../authController')
const mongoData = require('../mongo/mongoData')

class SceneGenerator {
    constructor() {
        this.username = '',
        this.password = '',
        this.token = ''
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
                authController.loginTelegram(this.username, this.password)
                    .then(res => {
                        if(res.token) {
                            this.token = res.token
                            ctx.reply('Авторизация прошла успешно')
                            ctx.scene.enter('counters')
                        } else {
                            ctx.reply(res.message)
                            setTimeout(() => {
                                ctx.scene.reenter()
                            }, 500);
                        }
                    })
            }   
        })
        return auth
    }

    counterScene() {
        const counters = new BaseScene('counters')
        const keyboard = Markup.keyboard(['Hourly', 'Daily', 'Current', 'Exit'])
        counters.enter(async (ctx) => {
            await ctx.reply('Выберите, какие данные вы хотите получить: почасовые, посуточные или текущие11:', keyboard)
        })
        counters.hears('Exit', (ctx) => {
            ctx.reply('Вы вышли. Теперь Вам нужно авторизоваться вновь', Markup.removeKeyboard(true))
            ctx.scene.enter('auth')
        })
        return counters
    }
}

module.exports = SceneGenerator