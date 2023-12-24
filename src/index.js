// Mineflayer
import mineflayer from 'mineflayer'
import armorManager from 'mineflayer-armor-manager'

// Configs
import { serverConfig } from './configs/serverConfig.js'
import { botConfig } from './configs/botConfig.js'

// Tools
import { viewSwitch } from './tools/viewSwitch/viewSwitch.js'

// Actions
import { viewInBrowser } from './actions/onSpawn/viewInBrowser.js'
import { botGreetings } from './actions/onSpawn/botGreetings.js'
import { botEquipArmor } from './actions/onSpawn/botEquipArmor.js'
import { botAttack } from './actions/onChat/botAttack.js'

// Logs
import { onSuccessJoin } from './actions/logs/onSuccessJoin/onSuccessJoin.js'
import { onKick } from './actions/logs/onKick/onKick.js'
import { onError } from './actions/logs/onError/onError.js'


// Bot params
const bot = mineflayer.createBot({
    host: serverConfig.host,
    port: serverConfig.port,
    version: serverConfig.version,

    skipValidation: true,

    // auth: botConfig.auth,
    username: botConfig.username,
    // password: botConfig.password,
})
bot.loadPlugin(armorManager);


// On spawn
viewInBrowser(bot, viewSwitch())
botGreetings(bot)
botEquipArmor(bot)

// On chat
botAttack(bot)

// Logs and errors and kick reasons:
onKick(bot)
onError(bot)
onSuccessJoin()
