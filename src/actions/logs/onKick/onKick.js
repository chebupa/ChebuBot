import { serverConfig } from '../../../configs/serverConfig.js'
import { botConfig } from '../../../configs/botConfig.js'
import { currentDate } from '../../../configs/currentDate.js'

import cc from 'node-console-colors'


export const onKick = (bot) => {
    bot.on(
        'kicked',
        () => console.log(
            cc.set(
                "fg_yellow",
                `${ botConfig.username } was kicked from ${ serverConfig.host } at ${ currentDate }\n`,
                'Please use ctrl+C to quit'
            )
        )
    )
}
