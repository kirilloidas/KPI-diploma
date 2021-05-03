// const Scene = require('telegraf/scenes/base')
const {
    Telegraf,
    Markup,
    session,
    Scenes: { BaseScene, Stage }
} = require("telegraf");
const moment = require('moment')
const authController = require('../authController')
const mongoData = require('../mongo/mongoData')
const dailyData = require('../models/CounterData.js').dailyData;
const hourlyData = require('../models/CounterData.js').hourlyData;
const currentDataModel = require('../models/CounterData.js').currentData;

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
            this.isDaily = true
            ctx.scene.enter('archive')
        })
        counters.command('Hourly', async (ctx) => {
            this.isDaily = false
            ctx.scene.enter('archive')
        })
        counters.command('Current', async (ctx) => {
            ctx.scene.enter('current')
        })
        return counters
    }

    archiveScene() {
        const archive = new BaseScene('archive')
        const keyboard = Markup.keyboard(['/Exit'])
        const getFileKeyboard = Markup.keyboard(['/GetFile'])

        archive.enter(async (ctx) => {
            this.startDay = null
            this.startMonth = null
            this.startYear = null
            this.startHours = null
            this.endDay = null
            this.endMonth = null
            this.endYear = null
            this.endHours = null
            await ctx.reply('Для получения данных необходимо ввести период. Начнем со началом интервала', keyboard)
            await ctx.reply('Введите год')
        })
        archive.command('Exit', async (ctx) => {
            await ctx.scene.enter('counters')
        })
        archive.command('GetFile', async (ctx) => {
            await ctx.replyWithDocument({ source: './data.xlsx'})
            await ctx.scene.enter('counters')
        })
        archive.on('text', async (ctx) => {
            if(!this.startYear) {
                this.startYear = ctx.message.text;
                await ctx.reply('Теперь введите месяц')
            } else if(!this.startMonth) {
                this.startMonth = ctx.message.text
                await ctx.reply('Теперь введите день')
            } else if(!this.startDay) {
                this.startDay = ctx.message.text
                if(this.isDaily) {
                    await ctx.reply('Отлично, начальные значения интервала записаны. Теперь нужно записать дату окончания... Введите год окончания')
                } else {
                    await ctx.reply('Теперь введите время (в часах)')
                }
            } else if(!this.startHours && !this.isDaily) {
                this.startHours = ctx.message.text
                await ctx.reply('Отлично, начальные значения интервала записаны. Теперь нужно записать дату окончания... Введите год окончания')
            } else if(!this.endYear) {
                this.endYear = ctx.message.text
                await ctx.reply('Введите месяц окончания')
            } else if(!this.endMonth) {
                this.endMonth = ctx.message.text
                await ctx.reply('Введите день окончания')
            } else if(!this.endDay) {
                this.endDay = ctx.message.text
                if(this.isDaily) {
                    this.mongoDailyScene()
                        .then(async () => {
                            await ctx.reply('Данные обработаны, можете получить файл', getFileKeyboard)
                        })
                } else {
                    await ctx.reply('Введите время окончания (в часах)')
                }
            } else if(!this.endHours && !this.isDaily) {
                this.endHours = ctx.message.text
                this.mongoHourlyScene()
                    .then(async () => {
                        await ctx.reply('Данные обработаны, можете получить файл', getFileKeyboard)
                    })
            }
        })
        return archive
    }

    currentCounterScene() {
        const current = new BaseScene('current')
        const getFileKeyboard = Markup.keyboard(['/GetFile'])

        current.command('GetFile', async (ctx) => {
            await ctx.replyWithDocument({ source: './data.xlsx'})
            await ctx.scene.enter('counters')
        })
        
        current.enter(async (ctx) => {
            await ctx.reply('Выберите, какие данные вы хотите получить: почасовые, посуточные или текущие:')
            this.mongoCurrentScene()
                .then(async () => {
                    await ctx.reply('Файл готов к скачиванию, можете его загрузить', getFileKeyboard)
                })
        })

        return current
    }

    mongoDailyScene() {
        return mongoData.getDataOfInterval({
            startTime: moment([this.startYear, this.startMonth, this.startDay]).valueOf(),
            endTime: moment([this.endYear, this.endMonth, (+this.endDay + 1)]).valueOf(),
            switchCheckedObj: this.switchCheckedObj,
            isDaily: true
        }, dailyData)
    }

    mongoHourlyScene() {
        return mongoData.getDataOfInterval({
            startTime: moment([this.startYear, this.startMonth, this.startDay, this.startHours]).valueOf(),
            endTime: moment([this.endYear, this.endMonth, this.endDay, this.endHours]).valueOf(),
            switchCheckedObj: this.switchCheckedObj,
            isDaily: false
        }, hourlyData)
    }

    mongoCurrentScene() {
        return mongoData.getCurrentDataCounter1(currentDataModel)
    }
}

module.exports = SceneGenerator