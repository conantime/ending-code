/**
 * 实现一个Promise
 */

class _Promise {
    constructor(executor) {
        this._state = 'PENDING'
        this._value = undefined
        this.handler = []
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    } 

    static _resolve() {
        
    }

    static _reject() {
        
    }
}

/**
 * 
 * @param {*} promises 
 * @returns 判断promises是可以迭代的数组，返回一个promise 对象 resolve的是一个数组，依次执行Promise数组，有一个报错后，就reject
 */

Promise._all = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises == null || typeof promises[Symbol.iterator] !== "function") {
            throw new Error(`${promises} is not a iterable`)
        }

        let res = []

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((r) => {
                res.push(r)
                if (index === promises.length) resolve(res)
            }).catch(() => reject())
        });
    })
}

/**
 * 与Promise.All不同的是以第一次的执行状态为结果，后续的结果不会改变
 */

Promise._race = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises == null || typeof promises[Symbol.iterator] !== "function") {
            throw new Error(`${promises} is not a iterable function`)
        }

        let res = []
        

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        });
    })
}

setTimeout(() => {
    //执行后 回调一个宏事件
    console.log('内层宏事件3') //6
}, 0)
console.log('外层宏事件1'); //1

new Promise((resolve) => {
    console.log('外层宏事件2'); //3 
    resolve()
}).then(() => {
    console.log('微事件1'); //4
}).then(()=>{
    console.log('微事件2') //5
})
console.log('外层宏事件3'); //2
