import { prompt } from 'readline-sync'
import cc from 'node-console-colors'


export const viewSwitch = () => {
    while (true) {
        console.log('\n1st or 3rd person bot view? ( 1/3 )')

        const inputViewInBrowserMode = prompt()

        if (inputViewInBrowserMode === '1') {
            return true
        } else if (inputViewInBrowserMode === '3') {
            return false
        } else {
            continue
        }
    }
}
