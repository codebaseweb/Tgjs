const { Telegraf, Markup } = require('telegraf');
const { LOCATIONS } = require('./data');

// Берем токен из переменных окружения Railway (или вставь свой для теста)
const bot = new Telegraf(process.env.BOT_TOKEN || 'ВСТАВЬ_СЮДА_ТОКЕН_БОТА');

// Временное хранилище игроков (в будущем можно подключить JSON или базу)
const players = {};

// Функция получения или создания игрока
function getPlayer(userId) {
    if (!players[userId]) {
        players[userId] = {
            hp: 100,
            maxHp: 100,
            gold: 0,
            level: 1
        };
    }
    return players[userId];
}

// Команда /start — отправляем первую картинку с меню
bot.start(async (ctx) => {
    const userId = ctx.from.id;
    getPlayer(userId);
    const loc = LOCATIONS.camp;

    await ctx.replyWithPhoto(loc.image, {
        caption: `*${loc.name}*\n\n${loc.text}`,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard(loc.buttons)
    });
});

// Обработчик всех нажатий на инлайн-кнопки
bot.on('callback_query', async (ctx) => {
    const action = ctx.callbackQuery.data;
    const userId = ctx.from.id;
    const player = getPlayer(userId);

    // Обязательно отвечаем Telegram, чтобы убрать "часики" на кнопке
    await ctx.answerCbQuery();

    // 1. Переход по локациям (меняем картинку и текст в том же сообщении!)
    if (action.startsWith('loc_')) {
        const locKey = action.replace('loc_', '');
        const loc = LOCATIONS[locKey];

        if (loc) {
            await ctx.editMessageMedia(
                {
                    type: 'photo',
                    media: loc.image,
                    caption: `*${loc.name}*\n\n${loc.text}`,
                    parse_mode: 'Markdown'
                },
                Markup.inlineKeyboard(loc.buttons)
            );
        }
    }

    // 2. Просмотр профиля
    if (action === 'profile') {
        await ctx.editMessageCaption(
            `👤 *Твой герой*\n\n❤️ Здоровье: ${player.hp}/${player.maxHp}\n⭐ Уровень: ${player.level}\n💰 Золото: ${player.gold}`,
            {
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [{ text: "🔙 Назад в лагерь", callback_data: "loc_camp" }]
                ])
            }
        );
    }

    // 3. Бой с гоблином
    if (action === 'attack_goblin') {
        const reward = 15;
        player.gold += reward;
        player.hp -= 10;

        await ctx.editMessageCaption(
            `⚔️ *Победа!*\n\nТы одолел гоблина, потеряв 10 HP, но нашел *${reward} золота*!\nТекущее HP: ${player.hp}`,
            {
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [{ text: "🗡 Искать еще врагов", callback_data: "loc_forest" }],
                    [{ text: "🔥 Вернуться в лагерь", callback_data: "loc_camp" }]
                ])
            }
        );
    }
});

// Запуск бота
bot.launch().then(() => {
    console.log('🚀 JS RPG Бот успешно запущен!');
});

// Корректная остановка при перезапуске на сервере
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
