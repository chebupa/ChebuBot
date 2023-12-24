// const mineflayer = require('mineflayer')
import mineflayer from 'mineflayer'

// const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
// const mineflayerViewer = require('prismarine-viewer').mineflayer
import prismarineViewer from 'prismarine-viewer'
const mineflayerViewer = prismarineViewer.mineflayer

import armorManager from 'mineflayer-armor-manager'

// const cc = require('node-console-colors')
import cc from 'node-console-colors'

import open from 'open'

// const serverConfig = require('./configs/serverConfig')
import { serverConfig } from './configs/serverConfig.js'

// const botConfig = require('./configs/botConfig')
import { botConfig } from './configs/botConfig.js'

let currentDate = new Date()

const bot = mineflayer.createBot({
    host: serverConfig.host,
    port: serverConfig.port,
    version: serverConfig.version,

    // auth: botConfig.auth,
    username: botConfig.username,
    // password: botConfig.password,
})
bot.loadPlugin(armorManager);

// On spawn
bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3000, firstPerson: true }) // Start the viewing server on port 3000
    open('http://localhost:3000')
  
    // Draw the path followed by the bot
    const path = [bot.entity.position.clone()]
    bot.on('move', () => {
        if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
            path.push(bot.entity.position.clone())
            bot.viewer.drawLine('path', path)
        }
    })
})
bot.once("spawn", () => bot.armorManager.equipAll());

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



// Log errors and kick reasons:
bot.on(
    'kicked',
    () => console.log(
        cc.set(
            "fg_yellow",
            `Bot was kicked from ${ serverConfig.host } at ${ currentDate }`
        )
    )
)
bot.on(
    'error',
    () => console.log(
        cc.set(
            "fg_red",
            "Error occured"
        )
    )
)

// Log if bot successfully joined the server
console.log(
    cc.set(
        "fg_green",
        `Bot successfully joined ${ serverConfig.host }:${ serverConfig.port }`
    )
)
