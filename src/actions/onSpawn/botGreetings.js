import { botConfig } from "../../configs/botConfig.js";

export const botGreetings = (bot) => {
    bot.once("spawn", () => bot.chat(`Hello there! My name is ${ botConfig.username }`));
}
