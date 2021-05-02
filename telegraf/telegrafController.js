const {
    Telegraf,
    Markup,
    session,
    Scenes: { BaseScene, Stage }
} = require("telegraf");
const SceneGenerator = require('./scenes')
const curScene = new SceneGenerator()
const authScene = curScene.authScene()
const counterScene = curScene.counterScene()
const archiveScene = curScene.archiveScene()

class TelegrafController {
    static controller() {
        const bot = new Telegraf("1605090343:AAGp3XULDmenK3BPWxVU4B6tDN26efM-95M");

        const stage = new Stage([authScene, counterScene, archiveScene])

        bot.use(session())
        bot.use(stage.middleware())

        // const keyboard = Markup.keyboard(
        //     [
        //         [
        //             'Registration'
        //         ],
        //         [
        //             'GetData'
        //         ]
        //     ]
        // )
        // const nameScene = new BaseScene();
        // Обработчик начала диалога с ботом
        bot.start((ctx) => {
            // ctx.reply(
            //     `Приветствую, ${
            // ctx.from.first_name ? ctx.from.first_name : "хороший человек"
            // }! Набери /getFile и получи свой файл`);
            ctx.reply('Для работы с ботом необходимо авторизоваться')
            ctx.scene.enter('auth')
        })

        // bot.command('scenes', async (ctx) => {
        //     ctx.scene.enter('auth')
        // })


        // Обработчик команды /help
        // bot.command("getFile", (ctx) => {
        //     ctx.replyWithDocument({ source: './data.xlsx'})
        // })

        // Запуск бота
        bot.launch();
    }
}

module.exports = TelegrafController