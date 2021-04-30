// const Scene = require('telegraf/scenes/base')
const {
    Telegraf,
    Markup,
    session,
    Scenes: { BaseScene, Stage }
} = require("telegraf");
const authController = require('../authController')
const mongoData = require('../mongo/mongoData')
const dailyData = require('../models/CounterData.js').dailyData;
const hourlyData = require('../models/CounterData.js').hourlyData;

class SceneGenerator {
    constructor() {
        this.username = '',
        this.password = '',
        this.token = '',
        this.startDay,
        this.startMonth,
        this.startYear,
        this.startHours,
        this.endDay,
        this.endMonth,
        this.endYear,
        this.endHours,
        this.switchCheckedObj = {
            '0': true,
            '1': true,
            '2': true,
            '3': true,
            '4': true,
            '5': true,
            '6': true,
            '7': true,
            '8': true,
            '9': true,
        },
        this.isDaily
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
        const keyboard = Markup.keyboard(['/Hourly', '/Daily', '/Current', '/Exit'])
        counters.enter(async (ctx) => {
            await ctx.reply('Выберите, какие данные вы хотите получить: почасовые, посуточные или текущие11:', keyboard)
        })
        counters.command('Exit', (ctx) => {
            ctx.reply('Вы вышли. Теперь Вам нужно авторизоваться вновь', Markup.removeKeyboard(true))
            ctx.scene.enter('auth')
        })
        counters.command('Daily', async (ctx) => {
            ctx.scene.enter('daily')
        })
        return counters
    }

    dailyScene() {
        const daily = new BaseScene('daily')
        const keyboard = Markup.keyboard(['/Exit'])
        const getFileKeyboard = Markup.keyboard(['/GetFile'])

        daily.enter(async (ctx) => {
            this.startDay = null
            this.startMonth = null
            this.startYear = null
            this.endDay = null
            this.endMonth = null
            this.endYear = null
            this.isDaily = true
            await ctx.reply('Для получения данных необходимо ввести период. Начнем со началом интервала', keyboard)
            await ctx.reply('Введите год')
        })
        daily.command('Exit', async (ctx) => {
            await ctx.scene.enter('counters')
        })
        daily.command('GetFile', async (ctx) => {
            console.log('1121')
            await ctx.replyWithDocument({ source: './data.xlsx'})
        })
        daily.on('text', async (ctx) => {
            if(!this.startYear) {
                this.startYear = ctx.message.text;
                await ctx.reply('Теперь введите месяц')
            } else if(!this.startMonth) {
                this.startMonth = ctx.message.text
                await ctx.reply('Теперь введите день')
            } else if(!this.startDay) {
                this.startDay = ctx.message.text
                await ctx.reply('Отлично, начальные значения интервала записаны. Теперь нужно записать дату окончания... Введите год окончания')
            } else if(!this.endYear) {
                this.endYear = ctx.message.text
                await ctx.reply('Введите месяц окончания')
            } else if(!this.endMonth) {
                this.endMonth = ctx.message.text
                await ctx.reply('Введите день окончания')
            } else if(!this.endDay) {
                this.endDay = ctx.message.text
                console.log(this.startYear, this.startMonth, this.startDay, this.endYear, this.endMonth, this.endDay)
                mongoData.getDataOfInterval({
                    startTime: new Date(this.startYear, this.startMonth, this.startDay + 1).getTime(),
                    endTime: new Date(this.endYear, this.endMonth, this.endDay + 1).getTime(),
                    switchCheckedObj: this.switchCheckedObj,
                    isDaily: this.isDaily
                }, dailyData)
                    .then(async data => {
                        // await ctx.replyWithDocument({ source: '../data.xlsx'})
                        await ctx.reply('Данные обработаны, можете получить файл', getFileKeyboard)
                    })
            }
        })
        return daily
    }
}

module.exports = SceneGenerator