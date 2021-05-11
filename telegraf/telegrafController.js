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
const currentCounterScene = curScene.currentCounterScene()

class TelegrafController {
    static controller() {
        const bot = new Telegraf("1605090343:AAGp3XULDmenK3BPWxVU4B6tDN26efM-95M");

        const stage = new Stage([authScene, counterScene, archiveScene, currentCounterScene])

        bot.use(session())
        bot.use(stage.middleware())

        // Обработчик начала диалога с ботом
        bot.start((ctx) => {
            ctx.reply('Для работы с ботом необходимо авторизоваться')
            ctx.scene.enter('auth')
        })

        // Запуск бота
        bot.launch();
    }
}

module.exports = TelegrafController