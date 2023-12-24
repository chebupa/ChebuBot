import { inputServerConfig } from "../tools/inputServerConfig/inputServerConfig.js"


const config = inputServerConfig()


export const serverConfig = {
    host: config.host,
    port: config.port,
    version: config.version,
}
