const getParams = new URLSearchParams(window.location.search);
export const CONFIG = {
    debug: true,
    fastTest: getParams.get('fastTest') != undefined,
    showDebug: getParams.get('showDebug') != undefined,
    //disables => disclaimer , connect wallet ,smart contract transactions, apiCalls
    screen: {
        width: 1440,
        height: 1024,
    },
    defaultTextStyle: {
        fontFamily: 'bahnschrift',
        fontStyle: 'bold',
        color: '#fff',
    },
    CLIENT_VERSION: '0.0.0',
    DICE_COUNT: 3,
};