# ChebuBot
 ChebuBot - minecraft multifunctional bot


To hide "Console log colors list on every startup"
1) go to node_modules/node-console-colors/index.js
2) find this part of code:
    if (!module.parent) {
        listColors();
    }
3) Comment/delete this part of code
