import { prompt } from 'readline-sync'


export const inputServerConfig = () => {
    const config = {
        host: '',
        port: 0,
        version: '0.0.0',
    }
    

    // Server config
    console.log(`Host: `)
    config.host = prompt()

    console.log(`Port: `)
    config.port = Number(prompt())

    console.log(`Game version: `)
    config.version = prompt()


    return config
}
