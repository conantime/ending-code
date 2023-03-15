Array.prototype._flat = function (arr) {
    console.log(this)
    if (!Array.isArray(this)) {
        throw new Error('Not a Array')
    }

    for (let i in this) {
        console.log(i)
        if (Array.isArray(this[i])) {
            this._flat(arr)
        }
        arr.push(this[i])
    }
}

[1, 2,[1,2],[23],2]._flat([])