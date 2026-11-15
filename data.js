// База локаций и монстров
const LOCATIONS = {
    camp: {
        name: "🔥 Лагерь Выживших",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
        text: "Ты у теплого костра в безопасном лагере. Куда отправишься дальше?",
        buttons: [
            [{ text: "🌲 Пойти в Мрачный Лес", callback_data: "loc_forest" }],
            [{ text: "⚔️ Профиль героя", callback_data: "profile" }]
        ]
    },
    forest: {
        name: "🌲 Мрачный Лес",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
        text: "Вокруг густой туман. Из кустов выскакивает Дикий Гоблин!",
        buttons: [
            [{ text: "🗡 Атаковать гоблина", callback_data: "attack_goblin" }],
            [{ text: "🏃 Сбежать в лагерь", callback_data: "loc_camp" }]
        ]
    }
};

module.exports = { LOCATIONS };
