class Emmiter {
    constructor() {
        this.event = {}
    }

    $on(name, cb) {
        if (this.event[name]) {
            this.event[name].push(cb)
        } else {
            this.event[name] = [cb]
        }
    }    

    $off(name, callback) {
        if (!this.event[name]) return
        if (!callback) {
            this.event[name] = undefined
        }
        this.event[name] = this.event[name].filters(v => v !== callback)
    }

    $emit(name, ...args) {
        if (!this.event[name]) return
        this.event[name].forEach(e => {
            e(...args)
        });
    }
}

