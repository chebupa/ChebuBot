export const botAttack = (bot) => {
    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        if (message === 'ChebuBot attack') {
            bot.chat("After 3 seconds I'll attack")
            setTimeout(
                () => bot.chat('1'),
                1000
            )
            setTimeout(
                () => bot.chat('2'),
                2000
            )
            setTimeout(
                () => bot.chat('3'),
                3000
            )
            setTimeout(
                () => bot.attack(username),
                4000
            )
        }
    })
}
