import { serverConfig } from '../../../configs/serverConfig.js'

import cc from 'node-console-colors'


export const onSuccessJoin = () => {
    console.log(
        cc.set(
            "fg_green",
            `\nBot successfully joined ${ serverConfig.host }:${ serverConfig.port }`
        )
    )
}
