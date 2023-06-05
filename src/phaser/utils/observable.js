function createObservable(value) {
    const result = {
        _val: value,
        listeners: new Set(),
        get value() {
            return result._val;
        },
        set value(val) {
            result._val = val;
            this.listeners.forEach(element => {
                element();
            });
        }
    };
    return result;
}
module.exports = {
    createObservable
};