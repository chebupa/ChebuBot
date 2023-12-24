export const botEquipArmor = (bot) => {
    bot.once("spawn", () => bot.armorManager.equipAll());
}
