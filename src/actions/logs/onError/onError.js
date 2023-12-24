import cc from 'node-console-colors'


export const onError = (bot) => {
    bot.on(
        'error',
        () => console.log(
            cc.set(
                "fg_red",
                "Error occured"
            )
        )
    )
}
