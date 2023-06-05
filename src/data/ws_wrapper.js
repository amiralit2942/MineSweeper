export class WSWrapper {
    isConnected = false
    constructor({ url, publicKey, onOpen = () => { }, onClose = () => { } }) {
        if (url == undefined)
            return;
        this.ws = new WebSocket(url + `?publicKey=${publicKey}`);
        this._requestId = 0;
        this._requests = {};
        this.isConnected = false;
        this.ws.onopen = () => {
            this.isConnected = true;
            onOpen();
            this.pingInterval = setInterval(() => {
                this.ws.send('ping');
            }, 500);
        };
        this.ws.onclose = () => {
            this.isConnected = false;
            onClose();
            if (this.pingInterval != undefined)
                clearInterval(this.pingInterval);
        }
        this.ws.onmessage = (evt) => {
            let str = evt.data;
            let parts = str.split('\n');
            for (var i = 0; i < parts.length; i++) {
                let msg = parts[i];
                if (msg == 'ping' || msg == 'pong')
                    continue;
                if (msg.indexOf('{') == -1)
                    continue;
                let resp = JSON.parse(msg);
                let requestWithCallback = this._requests[resp.requestId];
                if (requestWithCallback != undefined) {
                    requestWithCallback.callback(resp);
                    delete (this._requests[resp.requestId]);
                    continue;
                }
                // console.log('orphan onMessage', resp);
                if (this.onMessage != undefined)
                    this.onMessage(resp);
            }
        };
        this.request = (namespace, method, parameters) => {
            return new Promise((resolve, reject) => {
                this.requestWithCallback(namespace, method, parameters, (resp) => {
                    resolve(resp);
                });
            });
        };
        this.requestWithCallback = (namespace, method, parameters, callback) => {
            let r = {
                requestId: this._requestId++,
                namespace, method, parameters,
            }
            console.log('send=>', r);
            this.ws.send(JSON.stringify(r));
            let req = { ...r, callback };
            this._requests[req.requestId] = req;
        }
    }
}