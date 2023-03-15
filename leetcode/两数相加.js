const addTwoNumbers = function(l1, l2) {
    if (!Array.isArray(l1) || ! Array.isArray(l2)) {
        return []
    }
    if (l1 === [0] || l1.length === 0) {
        return l2
    } 
    if (l2 === [0] || l2.length === 0) {
        return l1
    }
    const newArr = []

    const maxLength = Math.max(l1.length, l2.length)
    let n = 0
    console.log(maxLength)
    for (let i = 0; i < maxLength; i ++) {
        if (l1[i] === undefined) {
            l1[i] = 0
        }
        if (l2[i] === undefined) {
            l2[i] = 0
        }
        const sum = l1[i] + l2[i] + n
        if (sum > 10) {
            newArr.push(sum - 10)
            n = 1
            
            if (i === maxLength - 1) {
                newArr.push(n)
            }
        } else {
            newArr.push(sum)
            n = 0
        }
    }

    return newArr
};

const a = addTwoNumbers([1,3,4], [2,3,7])
console.log(a)

