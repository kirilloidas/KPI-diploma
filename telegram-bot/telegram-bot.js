const {
    Telegraf,
    Markup
} = require("telegraf");

module.exports = function(req, res, next) {
    const bot = new Telegraf("1605090343:AAGp3XULDmenK3BPWxVU4B6tDN26efM-95M");

    // Обработчик начала диалога с ботом
    bot.start((ctx) =>
        ctx.reply(
            `Приветствую, ${
           ctx.from.first_name ? ctx.from.first_name : "хороший человек"
        }! Набери /getFile и получи свой файл`
        ))
    
    
    // Обработчик команды /help
    // bot.help((ctx) => ctx.reply("Справка в процессе"));
    bot.command("getFile", (ctx) => {
        ctx.replyWithDocument({ source: './data.xlsx'})
    })
    
    // Запуск бота
    bot.launch();
}