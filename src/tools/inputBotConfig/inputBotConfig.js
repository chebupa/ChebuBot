import { prompt } from 'readline-sync'


export const inputBotConfig = () => {
    const config = {
        auth: 'microsoft',
        username: '',
        password: '',
    }


    // Bot config
    console.log(`Username: `)
    config.username = prompt()

    console.log(`Password(not necessary): `)
    config.password = prompt()


    return config
}
