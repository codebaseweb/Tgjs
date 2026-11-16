// База локаций и монстров
// data.js
const LOCATIONS = {
    camp: {
        name: "🔥 Лагерь Выживших",
        // Картинка лагеря
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
        text: "Ты у теплого костра в безопасном лагере. Куда отправишься дальше?",
        buttons: [
            [{ text: "🌲 Пойти в Мрачный Лес", callback_data: "loc_forest" }],
            [{ text: "⚒️ Зайти к Кузнецу", callback_data: "loc_blacksmith" }],
            [{ text: "👴 Навестить Старосту", callback_data: "loc_elder" }],
            [{ text: "⚔️ Профиль героя", callback_data: "profile" }]
        ]
    },
    forest: {
        name: "🌲 Мрачный Лес",
        // Картинка леса
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
        text: "Вокруг густой туман. Из кустов выскакивает Дикий Гоблин!",
        buttons: [
            [{ text: "🗡 Атаковать гоблина", callback_data: "attack_goblin" }],
            [{ text: "🔥 Вернуться в лагерь", callback_data: "loc_camp" }]
        ]
    },
    blacksmith: {
        name: "⚒️ Кузница",
        // Картинка кузницы
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
        text: "Жар от горна бьет в лицо. Кузнец протирает пот со лба: 'Ищешь хорошее оружие, странник? Железный меч сделает тебя сильнее!'",
        buttons: [
            [{ text: "🛡 Купить железный меч (50 золота)", callback_data: "buy_sword" }],
            [{ text: "🔥 Вернуться в лагерь", callback_data: "loc_camp" }]
        ]
    },
    elder: {
        name: "👴 Дом Старосты",
        // Картинка старосты / дома
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
        text: "Староста сидит у карты и качает головой: 'В лесу совсем распоясались монстры. Очисти лес, и я щедро награжу тебя!'",
        buttons: [
            [{ text: "📜 Взять квест: Охота на гоблинов", callback_data: "take_quest" }],
            [{ text: "🔥 Вернуться в лагерь", callback_data: "loc_camp" }]
        ]
    }
};

module.exports = { LOCATIONS };
