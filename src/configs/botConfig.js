import { inputBotConfig } from "../tools/inputBotConfig/inputBotConfig.js"


const config = inputBotConfig()


export const botConfig = {
    auth: 'microsoft',
    username: config.username,
    password: config.password,
}
