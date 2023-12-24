import prismarineViewer from 'prismarine-viewer'

import open from 'open'


const mineflayerViewer = prismarineViewer.mineflayer


export const viewInBrowser = (bot, mode) => {
    bot.once('spawn', () => {
        mineflayerViewer(bot, { port: 3000, firstPerson: mode })
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
}
